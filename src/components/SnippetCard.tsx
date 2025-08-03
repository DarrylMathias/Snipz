import { doc, getDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CodePreview from "./CodePreview";
import { db } from "@/config/firebase.config";

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

const formatDate = (timestamp: number | Timestamp): string => {
  let date: Date;
  if (timestamp instanceof Timestamp) {
    date = timestamp.toDate();
  } else {
    date = new Date(timestamp);
  }
  return date.toLocaleDateString("en-GB");
};

const SnippetCard = ({
  code,
  language,
  snippet,
}: {
  code: string;
  language: string;
  snippet: Snippet;
}) => {
  return (
    <div
      className="card bg-base-100 sm:w-full md:w-3/4 lg:w-96 shadow-sm"
      data-theme="dark"
    >
      <figure>
        <CodePreview code={code} language={language} />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-between items-center my-2">
          <h2 className="text-xl sm:text-2xl">{snippet.title}</h2>
          <div className="badge badge-secondary">{snippet.lang}</div>
        </h2>
        <p>
          {snippet.subtitle.length > 50
            ? snippet.subtitle.substring(0, 50) + "..."
            : snippet.subtitle}
        </p>
        <div className="card-actions justify-end my-2">
          {snippet.tags.map((tag) => (
            <div className="badge badge-outline">{tag}</div>
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center my-4 p-2 text-sm text-base-content opacity-70">
        <span>{formatDate(snippet.timestamp)}</span>
      </div>
    </div>
  );
};

export default SnippetCard;
