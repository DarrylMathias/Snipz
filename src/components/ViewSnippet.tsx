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
import { Badge } from "./ui/badge";
import { CodeBlock } from "./ui/code-block";

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

export default function ViewSnippet() {
  return (
    <SidebarSnippets>
      <Home />
    </SidebarSnippets>
  );
}

function Home() {
  const params = useParams();
  const snippetId = params.snippetId;

  const [snippet, setSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    async function loadSnippet() {
      try {
        const cachedSnippet = localStorage.getItem(`snippet_${snippetId}`);
        if (cachedSnippet) {
          const cached = JSON.parse(cachedSnippet) as Snippet;
          if (cached.uid === snippetId) {
            setSnippet(cached);
            console.log("Took ls data");
          }
        } else if (snippetId && typeof snippetId === "string") {
          const docRef = doc(db, "snippet", snippetId);
          const dbSnippet = await getDoc(docRef);
          const data = dbSnippet.data() as Snippet;
          if (dbSnippet.exists()) {
            setSnippet(data);
            console.log("Took db data");
          }
        }
      } catch (error) {
        console.error("Error loading snippet:", error);
      }
    }
    loadSnippet();
  }, []);

  if (!snippet) return <div className="text-white p-4">Loading...</div>;

  return (
    <div>
      <div className="min-h-screen bg-zinc-950">
        <div className="relative">
          <div className="max-w-6xl mx-auto px-8 py-12">
            <header className="mb-12">
              <div className="space-y-3">
                <h1
                  data-name="title"
                  className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white/95 outline-none leading-tight tracking-tight hover:text-white transition-colors duration-300 cursor-text"
                >
                  {snippet.title}
                </h1>
                <div
                  className={`h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 w-24`}
                ></div>
                <h3
                  data-name="subtitle"
                  className="text-xl md:text-2xl font-light text-slate-300 outline-none leading-relaxed max-w-3xl hover:text-slate-100 transition-colors duration-300 cursor-text"
                >
                  {snippet.subtitle}
                </h3>
              </div>
              <div className="flex gap-x-3 mt-1">
                {snippet.tags.map((badge) => (
                  <Badge variant="outline" className=" text-sm">{badge}</Badge>
                ))}
              </div>
            </header>

            <main className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-1 shadow-2xl shadow-black/20">
                <div
                  className="bg-slate-900/50 rounded-xl overflow-x-hidden border border-slate-700/50 
                    h-[53vh]"
                >
                  <CodeBlock
                    language={snippet.lang}
                    filename={snippet.title}
                    code={snippet.code}
                  />
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
          </div>
        </div>
      </div>
    </div>
  );
}
