"use client";

import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useRef } from "react";
import { LoaderFive } from "@/components/ui/loader";

type CodeEditorProps = {
  initialCode: string;
  language: string;
  onChange: (
    value: string | undefined,
    editor: monaco.editor.IStandaloneCodeEditor
  ) => void;
  initialEditorState: {
    position: monaco.Position | null;
    selection: monaco.Selection | null;
    scrollTop: number;
    scrollLeft: number;
  };
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  onChange,
  initialEditorState,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
    if (initialCode) {
      editor.setValue(initialCode);
    }
    // Restore editor state
    requestAnimationFrame(() => {
      if (initialEditorState.selection) {
        editor.setSelection(initialEditorState.selection);
      } else if (initialEditorState.position) {
        editor.setPosition(initialEditorState.position);
      }
      editor.setScrollPosition({
        scrollTop: initialEditorState.scrollTop,
        scrollLeft: initialEditorState.scrollLeft,
      });
    });
  };

  return (
    <Editor
      height="90vh"
      theme="vs-dark"
      defaultValue={initialCode}
      language={language}
      onMount={onMount}
      onChange={(value) => {
        if (editorRef.current) {
          onChange(value, editorRef.current);
        }
      }}
      loading={
        <LoaderFive text="Please Wait..." />
      }
      options={{
        minimap: { enabled: false }, // Disable the minimap
        wordWrap: "on"
      }}
    />
  );
};

export default CodeEditor;
