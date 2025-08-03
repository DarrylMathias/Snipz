import ViewSnippet from "@/components/ViewSnippet";
import React from "react";

interface PageProps {
  params: { snippetId: string };
}

function SnippetReadPage({ params }: PageProps) {
  return (
    <div>
      {/* Reading Snippet {params.snippetId} */}
      <ViewSnippet />
    </div>
  );
}
export default SnippetReadPage;
