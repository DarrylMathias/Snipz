import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const CodePreview = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  code = code.split("\n").slice(0, 10).join("\n");
  const codeMarkupRaw = hljs.highlight(code, { language });
  const codeMarkup = codeMarkupRaw.value.replace(/\n/g, "<br>");
//   console.log("codemarkup", codeMarkup);
  return (
    <div className="w-full h-50 bg-gray-900 rounded-lg overflow-hidden">

      {/* Top bar with dots */}
      <div className="bg-gray-800 px-3 py-1.5 flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      <div className="p-3 h-[calc(128px-50x)] overflow-hidden bg-gray-900">
        <div
          className="text-xs font-mono text-white leading-4"
          dangerouslySetInnerHTML={{ __html: codeMarkup }}
        />
      </div>
    </div>
  );
};

export default CodePreview;
