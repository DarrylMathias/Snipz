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

export default function Component(){
  return(
    <SidebarSnippets>
      <Home />
    </SidebarSnippets>
  )
}

function Home() {
  const demoSnippet = useMemo(() => ({
  title: "Cat Talk",
  subtitle: "What does the cat say?",
  code: `console.log("Meow 🐾");`,
  lang: "javascript",
  tags: ["nextjs", "react"],
  isPublic: false,
  isSaved: false,
}), []);


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

  const debouncedLanguage = useDebouncedCallback((code: string) => {
    const result = detectLanguageByPatterns(code);
    console.log(result);
    setSnippet((prev) => ({
      ...prev,
      lang: typeof result === "string" ? result : result?.id || prev.lang,
    }));
  }, 500);

  useEffect(() => {
    const cachedSnippet = localStorage.getItem("snippet");
    if (cachedSnippet) {
      const cached = JSON.parse(cachedSnippet);
      setSnippet(cached);
      setValues(cached.tags)
      if (titleRef.current) titleRef.current.innerText = cached.title;
      if (subtitleRef.current) subtitleRef.current.innerText = cached.subtitle;
    } else {
      setSnippet(demoSnippet);
      setValues(demoSnippet.tags)
      if (titleRef.current) titleRef.current.innerText = demoSnippet.title;
      if (subtitleRef.current)
        subtitleRef.current.innerText = demoSnippet.subtitle;
    }
    setInitialized(true);
    const languages = monaco.languages.getLanguages();
    console.log(languages);
  }, [demoSnippet]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("snippet", JSON.stringify(snippet));
      console.log("Saved to localStorage:", snippet);
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

  const handleLanguageChange = (newLang: string) => {
    setSnippet((prev) => ({ ...prev, lang: newLang }));
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

  const handleTagChange = (value : string[]) => {
      setValues(value);
      setSnippet((prev) => ({...prev, tags : value}))
  }

  const handleAccessChange = (value : boolean) => {
    setSnippet((prev) => ({...prev, isPublic : value}))
  }

  return (
    <div>
      <NavbarCreateSnippet isPublic={snippet.isPublic} onToggle={handleAccessChange} />
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

