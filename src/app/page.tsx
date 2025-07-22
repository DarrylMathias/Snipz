"use client";
import CodeEditor from "@/components/CodeEditor";
import EditorWrapper from "@/components/EditorWrapper";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const demoSnippet = {
  title: "Countdown Timer",
  subtitle: "Print numbers from 10 to 0 before liftoff!",
  code: `// Simple countdown
for (let i = 10; i >= 0; i--) {
  console.log(i === 0 ? "🚀 Liftoff!" : i);
}`,
  lang: "javascript",
  isSaved: false,
};


  const [snippet, setSnippet] = useState(demoSnippet);
  const [isInitialized, setInitialized] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const cachedSnippet = localStorage.getItem("snippet");
    if (cachedSnippet) {
      const cached = JSON.parse(cachedSnippet);
      setSnippet(cached);
      if (titleRef.current) titleRef.current.innerText = cached.title;
      if (subtitleRef.current) subtitleRef.current.innerText = cached.subtitle;
    } else {
      setSnippet(demoSnippet);
      if (titleRef.current) {
        titleRef.current.innerText = demoSnippet.title;
      }
      if (subtitleRef.current) subtitleRef.current.innerText = demoSnippet.subtitle;
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("snippet", JSON.stringify(snippet));
      console.log("Saved to localStorage:", snippet);
    }
  }, [snippet, isInitialized]);

  const handleInput = (e: React.FormEvent<HTMLHeadingElement>) => {
    const target = e.currentTarget;
    const cleaned = target.innerText.replace(/\s+/g, " ").trim();
    setSnippet((prev) => ({
      ...prev,
      [target.getAttribute("data-name") as string]: cleaned,
    }));
  };

  const handleLanguageChange = (newLang: string) => {
    setSnippet((prev) => ({ ...prev, lang: newLang }));
  };

  const handleCodeChange = (value: string | undefined) => {
    setSnippet((prev) => ({ ...prev, code: value ?? "" }));
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
        <div className="relative">
          <div className="max-w-6xl mx-auto px-8 py-12">
            <header className="mb-12">
              <div className="space-y-3">
                <h1
                  data-name="title"
                  className="text-5xl md:text-7xl font-semibold text-white/95 outline-none leading-tight tracking-tight hover:text-white transition-colors duration-300 cursor-text"
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
                        key={snippet.lang}
                        initialCode={snippet.code}
                        language={snippet.lang}
                        onChange={handleCodeChange}
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
                    {snippet.lang.toUpperCase()}
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
      {/* <div>
        <div className="min-h-screen ">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className=" rounded-xl p-6">
              <div className="space-y-6">
                <div className="p-4">
                  <h1
                    data-name="title"
                    className="text-6xl outline-0 font-bold text-indigo-50"
                    contentEditable
                    ref={titleRef}
                    onInput={handleInput}
                    suppressContentEditableWarning
                    spellCheck="false"
                  />
                  <h3
                    data-name="subtitle"
                    className="text-2xl pt-4 outline-0 font-bold text-indigo-50"
                    contentEditable
                    ref={subtitleRef}
                    onInput={handleInput}
                    suppressContentEditableWarning
                    spellCheck="false"
                  />
                </div>
                {isInitialized && (
                  <EditorWrapper
                    lang={snippet.lang}
                    setLang={handleLanguageChange}
                  >
                    <CodeEditor
                      key={snippet.lang}
                      initialCode={snippet.code}
                      language={snippet.lang}
                      onChange={handleCodeChange}
                    />
                  </EditorWrapper>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
