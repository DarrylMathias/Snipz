import hljs from "highlight.js";
import * as monaco from 'monaco-editor';
import { regexPatterns } from "./commonLangsRegex";

export default function detectLanguageByPatterns(code : string){
  const trimmed = code.trim();
  if (trimmed.length < 3) return 'plaintext';

  for (const { lang, patterns } of regexPatterns) {
    let matches = 0;
    for (const pattern of patterns) {
      if (pattern.test(trimmed)) {
        matches++;
      }
    }
    
    // Return language if we have enough matches
    const threshold = Math.min(2, Math.ceil(patterns.length * 0.1));
    if (matches >= threshold) {
      const languages = monaco.languages.getLanguages();
      const currentLanguage = languages.find((language) => language.id === lang);
      return currentLanguage || 'text';
    }
  }
  
  const result = hljs.highlightAuto(code);
  return result.language || 'text';
};