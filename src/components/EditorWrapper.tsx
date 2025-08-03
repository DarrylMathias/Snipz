"use client";

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
  // snippet: {
  //   title: string;
  //   subtitle: string;
  //   code: string;
  //   lang: string;
  //   tags: string[];
  //   isPublic: boolean;
  // };
};

const EditorWrapper = ({
  children,
  lang,
  setLang,
  //snippet,
}: EditorWrapperProps) => {
  return (
    <div className="group relative">
      {/* Animated Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />

      <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/30 bg-gray-800/30">
          <div className="items-center gap-3 md:flex hidden">
            <div className="hidden md:flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors cursor-pointer" />
            </div>
            <div className="h-4 w-px bg-gray-600/50 mx-2" />
            <span className="text-gray-400 text-sm font-mono">editor</span>
          </div>

          {/* Center - Language Selector */}
          <div className="flex-1 flex justify-end mx-3 items-center text-xs gap-5">
            <span className="text-green-500 text-[12px] md:text-xs">
              ✓ Saved
            </span>
            <LanguageSelector lang={lang} setLang={setLang} />
          </div>

          {/* Right - Save Button & Status */}
          <div className="md:flex hidden items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>Live</span>
            </div>
          </div>
        </div>

        {/* Code Editor with Enhanced Background */}
        <div className="relative bg-[#1e1e1e] bg-opacity-95">{children}</div>
      </div>
    </div>
  );
};

export default EditorWrapper;
