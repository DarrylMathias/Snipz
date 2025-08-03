"use client";
import CodeEditor from "@/components/CodeEditor";
import EditorWrapper from "@/components/EditorWrapper";
import detectLanguageByPatterns from "@/lib/langRegex";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import * as monaco from "monaco-editor";
import { InputTags } from "@/components/ui/tag-input";
import { NavbarCreateSnippet } from "@/components/NavbarCreate";
import SidebarSnippets from "@/components/SidebarSnippets";
import { Timestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Snippet {
  uid: string;
  owner: string | undefined;
  title: string;
  subtitle: string;
  code: string;
  lang: string;
  tags: string[];
  isPublic: boolean;
  timestamp: number | Timestamp;
}

export default function CreateSnippet() {
  return (
    <SidebarSnippets>
      <Home />
    </SidebarSnippets>
  );
}

function Home() {
  const params = useParams();
  const snippetId = params.snippetId;
  const router = useRouter();

  const demoSnippet = useMemo(
    () => ({
      uid: "",
      owner: "",
      title: "",
      subtitle: "",
      code: "",
      lang: "",
      tags: [] as string[],
      isPublic: false,
      timestamp: 0,
    }),
    []
  );

  const [snippet, setSnippet] = useState(demoSnippet);
  const [isInitialized, setInitialized] = useState(false);
  const [values, setValues] = useState<string[]>(demoSnippet.tags);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  // For returning the editor to the original state on auto lang detect
  const [editorState, setEditorState] = useState<{
    position: monaco.Position | null;
    selection: monaco.Selection | null;
    scrollTop: number;
    scrollLeft: number;
  }>({
    position: null,
    selection: null,
    scrollTop: 0,
    scrollLeft: 0,
  });

  const debouncedDbSave = useDebouncedCallback(async () => {
    if (snippetId && isInitialized && typeof snippetId === "string") {
      try {
        await setDoc(doc(db, "snippet", snippetId), snippet, { merge: true });
        toast.success("Auto Saved");
      } catch (error) {
        console.error("Error saving to database:", error);
        toast.error("Failed to save");
      }
    }
  }, 2000);

  const debouncedLanguage = useDebouncedCallback((code: string) => {
    const result = detectLanguageByPatterns(code);
    console.log(result);
    setSnippet((prev) => ({
      ...prev,
      lang: typeof result === "string" ? result : result?.id || prev.lang,
    }));
  }, 500);

  useEffect(() => {
    async function loadSnippet() {
      try {
        const cachedSnippet = localStorage.getItem(`snippet_${snippetId}`);
        if (cachedSnippet) {
          const cached = JSON.parse(cachedSnippet) as Snippet;
          if (cached.uid === snippetId) {
            setSnippet(cached);
            setValues(cached.tags);
            if (titleRef.current) titleRef.current.innerText = cached.title;
            if (subtitleRef.current)
              subtitleRef.current.innerText = cached.subtitle;
            console.log("Took ls data");
          }
        } else if (snippetId && typeof snippetId === "string") {
          const docRef = doc(db, "snippet", snippetId);
          const dbSnippet = await getDoc(docRef);
          const data = dbSnippet.data() as Snippet;
          if (dbSnippet.exists()) {
            setSnippet(data);
            setValues(data.tags);
            if (titleRef.current) titleRef.current.innerText = data.title;
            if (subtitleRef.current)
              subtitleRef.current.innerText = data.subtitle;
            console.log("Took db data");
          }
        }
        // setSnippet(demoSnippet);
        // setValues(demoSnippet.tags);
        // if (titleRef.current) titleRef.current.innerText = demoSnippet.title;
        // if (subtitleRef.current)
        //   subtitleRef.current.innerText = demoSnippet.subtitle;
        // console.log("Took demo data");
      } catch (error) {
        console.error("Error loading snippet:", error);
      }
      setInitialized(true);
      const languages = monaco.languages.getLanguages();
      // console.log(languages);
    }
    loadSnippet();
  }, []);

  useEffect(() => {
    if (isInitialized && snippetId && typeof snippetId === "string") {
      localStorage.setItem(`snippet_${snippetId}`, JSON.stringify(snippet));
      debouncedDbSave();
    }
  }, [snippet, isInitialized]);

  const handleInput = (e: React.FormEvent<HTMLHeadingElement>) => {
    const target = e.currentTarget;
    const cleanedString = target.innerText.replace(/\s+/g, " ").trim();
    setSnippet((prev) => ({
      ...prev,
      [target.getAttribute("data-name") as string]: cleanedString,
    }));
  };

  const handleCodeChange = (
    value: string | undefined,
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    setSnippet((prev) => ({ ...prev, code: value ?? "" }));
    // Save editor state
    setEditorState({
      position: editor.getPosition(),
      selection: editor.getSelection(),
      scrollTop: editor.getScrollTop(),
      scrollLeft: editor.getScrollLeft(),
    });
    debouncedLanguage(value ?? "");
  };

  const handleLanguageChange = (newLang: string) => {
    setSnippet((prev) => ({ ...prev, lang: newLang }));
  };

  const handleTagChange = (value: string[]) => {
    setValues(value);
    setSnippet((prev) => ({ ...prev, tags: value }));
  };

  const handleAccessChange = (value: boolean) => {
    setSnippet((prev) => ({ ...prev, isPublic: value }));
  };

  return (
    <div>
      <NavbarCreateSnippet
        snippetId={snippetId as string}
        snippet={snippet}
        isPublic={snippet.isPublic}
        onToggle={handleAccessChange}
      />
      <div className="min-h-screen bg-zinc-950">
        <div className="relative">
          <div className="max-w-6xl mx-auto px-8 py-12">
            <header className="mb-12">
              <div className="space-y-3">
                <h1
                  data-name="title"
                  className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white/95 outline-none leading-tight tracking-tight hover:text-white transition-colors duration-300 cursor-text"
                  contentEditable
                  ref={titleRef}
                  onInput={handleInput}
                  suppressContentEditableWarning
                  spellCheck="false"
                />
                <div
                  className={`h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 w-24`}
                ></div>
                <h3
                  data-name="subtitle"
                  className="text-xl md:text-2xl font-light text-slate-300 outline-none leading-relaxed max-w-3xl hover:text-slate-100 transition-colors duration-300 cursor-text"
                  contentEditable
                  ref={subtitleRef}
                  onInput={handleInput}
                  suppressContentEditableWarning
                  spellCheck="false"
                />
              </div>
              <div>
                {isInitialized && (
                  <InputTags
                    value={values}
                    onChange={handleTagChange}
                    placeholder="Enter values, comma separated..."
                    className="mt-5"
                  />
                )}
              </div>
            </header>

            {isInitialized && (
              <main className="space-y-6">
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-1 shadow-2xl shadow-black/20">
                  <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50">
                    <EditorWrapper
                      key={snippet.uid}
                      lang={snippet.lang}
                      setLang={handleLanguageChange}
                    >
                      <CodeEditor
                        initialCode={snippet.code}
                        language={snippet.lang}
                        onChange={handleCodeChange}
                        initialEditorState={editorState}
                      />
                    </EditorWrapper>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex justify-between items-center text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Ready to execute</span>
                  </div>
                  <div className="text-xs opacity-60">
                    {snippet.lang?.toUpperCase()}
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
