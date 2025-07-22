"use client";

import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef } from "react";

type CodeEditorProps = {
  initialCode: string;
  language: string;
  onChange: (value: string | undefined) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  onChange,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    // monacoInstance: typeof monaco
  ) => {
    editorRef.current = editor;
    editor.focus();
    if (initialCode) {
      editor.setValue(initialCode);
    }
  };

  useEffect(() => {
    if (editorRef.current && language) {
      const model = editorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  return (
    <Editor
      height="75vh"
      theme="vs-dark"
      defaultValue={initialCode}
      language={language} // dynamically updates the language
      onMount={onMount}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
