"use client";

import * as React from "react";
import * as monaco from "monaco-editor";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type LanguageSelectorProps = {
  lang: string;
  setLang: (newLang: string) => void;
};

export function LanguageSelector({ lang, setLang }: LanguageSelectorProps) {
  const languages = monaco.languages.getLanguages();
  const currentLanguage = languages.find((l) => l.id === lang);
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="hover:text-gray-200 hover:bg-gray-700/50 border border-gray-600/30 bg-transparent"
        >
          {currentLanguage?.aliases?.[0] || lang}
          <span className="ml-1 text-gray-500">▼</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-gray-800 border-gray-700 text-white">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup heading="Languages">
              {languages.map((language) => (
                <CommandItem
                  key={language.id}
                  onSelect={() => {
                    setLang(language.id);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {language.aliases?.[0] || language.id}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
