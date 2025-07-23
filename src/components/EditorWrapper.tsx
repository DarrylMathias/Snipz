"use client"

import React from "react";
import { LanguageSelector } from "./LanguageSelector";
import type {
  // Dispatch,
  // SetStateAction,
  ReactNode,
  HTMLAttributes,
} from "react";

type EditorWrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  lang: string;
  setLang: (newLang: string) => void;
};

const EditorWrapper = ({ children, lang, setLang }: EditorWrapperProps) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />

      <div className="relativerounded-3xl overflow-hidden shadow-2xl">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/30 bg-gray-800/30">
          <div className="items-center gap-3 hidden md:flex">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors cursor-pointer" />
            </div>
            <div className="h-4 w-px bg-gray-600/50 mx-2" />
            <span className="text-gray-400 text-sm font-mono">editor</span>
          </div>

          {/* Center - Language Selector */}
          <div className="flex-1 flex justify-end mx-3">
            <LanguageSelector lang={lang} setLang={setLang} />
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors cursor-pointer border border-indigo-500/30">
              Button
            </button>
            <div className="items-center gap-1 text-xs text-gray-500 hidden md:flex">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>Live</span>
            </div>
          </div>
        </div>

        <div className="relative bg-[#1e1e1e] bg-opacity-95">{children}</div>
      </div>
    </div>
  );
};

export default EditorWrapper;
