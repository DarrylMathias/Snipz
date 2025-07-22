"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "@/lib/langs";
// import { useEffect } from "react";

type LanguageSelectorProps = {
  lang: string;
  setLang: (newLang: string) => void;
};

export function LanguageSelector({ lang, setLang }: LanguageSelectorProps) {
  const currentLanguage = languages.find((language) => language.value === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 px-3 text-xs font-sans text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 border border-gray-600/30 bg-transparent"
        >
          {currentLanguage?.label}
          <span className="ml-1 text-gray-500">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 bg-gray-800/95 backdrop-blur-sm border-gray-700/50 shadow-xl"
        align="center"
      >
        <DropdownMenuLabel className="text-gray-300 text-xs font-medium px-2 py-1.5">
          Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700/50" />
        <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
          {languages.map((language) => (
            <DropdownMenuRadioItem
              key={language.value}
              value={language.value}
              className="text-xs font-sans text-gray-300 hover:bg-gray-700/50 hover:text-white focus:bg-gray-700/50 focus:text-white px-3 py-1.5 cursor-pointer [&>span]:hidden"
            >
              {language.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
