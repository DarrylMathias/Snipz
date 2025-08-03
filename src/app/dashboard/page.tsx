"use client";
import React, { useEffect, useState } from "react";
import SidebarSnippets from "@/components/SidebarSnippets";
import { Search, Grid, List, Calendar, Code } from "lucide-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";
import Link from "next/link";
import toast from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import CodePreview from "@/components/CodePreview";
import SnippetCard from "@/components/SnippetCard";

export default function Component() {
  return (
    <SidebarSnippets>
      <Dashboard />
    </SidebarSnippets>
  );
}

const FilterSkeleton = () => (
  <div className="flex flex-wrap gap-3 mb-6">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="h-9 bg-gray-200 rounded-full animate-pulse"
        style={{ width: `${60 + Math.random() * 40}px` }}
      />
    ))}
  </div>
);

const CardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
    {/* Preview Section Skeleton */}
    <div className="h-32 bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
    </div>

    {/* Content Skeleton */}
    <div className="p-4">
      <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
      </div>

      {/* Meta Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
      </div>
    </div>
  </div>
);

type Snippet = {
  uid: string;
  owner: string | undefined;
  title: string;
  subtitle: string;
  code: string;
  lang: string;
  tags: string[];
  isPublic: boolean;
  timestamp: number;
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [snippets, setsnippets] = useState<Snippet[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (userId: string) => {
      try {
        console.log(userId);
        const snippetRef = collection(db, "snippet");
        const q = query(
          snippetRef,
          where("owner", "==", userId),
          orderBy("timestamp", "desc"),
          limit(15)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        const queryData: any = [];
        const queryLang: any = ["All"];

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          console.log(docData.owner);
          console.log(docData.lang);
          queryData.push({
            id: doc.id,
            lang: docData.lang[0].toUpperCase() + docData.lang.substring(1),
            ...docData,
          });
          const formattedLang = docData.lang[0].toUpperCase() + docData.lang.substring(1);
          if (!queryLang.includes(formattedLang)) queryLang.push(formattedLang);
        });
        setsnippets(queryData);
        setFilters(queryLang);
        console.log(queryData);
        console.log(queryLang);
      } catch (err) {
        console.log(err);
        toast.error("Error fetching snippets");
        setFilters(["All"]);
      } finally {
        setLoading(false);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        fetchData(user.uid);
      } else {
        console.log("No authenticated user");
        setLoading(false);
        setFilters(["All"]);
      }
    });
    return () => unsubscribe();
  }, [auth.currentUser]);

  // const snippets = [
  //   {
  //     id: 1,
  //     title: "React Todo App",
  //     description:
  //       "A simple todo application built with React hooks and local storage",
  //     language: "React",
  //     date: "2 days ago",
  //     gradient: "from-blue-400 to-purple-600",
  //     icon: "⚛️",
  //   },
  //   {
  //     id: 2,
  //     title: "CSS Grid Layout",
  //     description: "Responsive grid layout with CSS Grid and modern techniques",
  //     language: "CSS",
  //     date: "5 days ago",
  //     gradient: "from-pink-400 to-red-500",
  //     icon: "🎨",
  //   },
  //   {
  //     id: 3,
  //     title: "Data Visualization",
  //     description: "Interactive charts using D3.js and modern JavaScript",
  //     language: "JavaScript",
  //     date: "1 week ago",
  //     gradient: "from-cyan-400 to-blue-500",
  //     icon: "📊",
  //   },
  //   {
  //     id: 4,
  //     title: "Python API Client",
  //     description: "RESTful API client with error handling and retry logic",
  //     language: "Python",
  //     date: "3 days ago",
  //     gradient: "from-pink-400 to-yellow-400",
  //     icon: "🐍",
  //   },
  //   {
  //     id: 5,
  //     title: "Vue Component Library",
  //     description: "Reusable Vue.js components with TypeScript support",
  //     language: "Vue",
  //     date: "6 days ago",
  //     gradient: "from-green-300 to-pink-300",
  //     icon: "💚",
  //   },
  //   {
  //     id: 6,
  //     title: "Mobile Navigation",
  //     description: "Responsive mobile-first navigation with smooth animations",
  //     language: "CSS",
  //     date: "4 days ago",
  //     gradient: "from-orange-200 to-orange-400",
  //     icon: "📱",
  //   },
  // ];

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesFilter =
      activeFilter === "All" || snippet.lang === activeFilter;
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.lang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  // For acertinity component
  const placeholders = [
    "Search for React hooks, Vue components, or Python scripts...",
    "Find CSS animations, grid layouts, or responsive designs...",
    "Look for API integrations, database queries, or auth patterns...",
    "Discover algorithms, data structures, or optimization techniques...",
    "Browse JavaScript utilities, TypeScript interfaces, or Node.js modules...",
    "Explore UI components, design systems, or accessibility patterns...",
    "Search by language: React, Vue, Angular, Python, Go, Rust...",
    "Find code for forms, charts, dashboards, or mobile apps...",
    "Look for testing patterns, deployment scripts, or CI/CD workflows...",
    "Discover performance optimizations, security patterns, or best practices...",
  ];

  const handleChange = () => {
    console.log("Yo");
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-purple-500 text-3xl sm:text-4xl md:text-5xl font-semibold outline-none leading-tight tracking-tight hover:text-white transition-colors duration-300 cursor-text my-2">
          Your Code Snippets
        </h1>
        <p className="text-lg md:text-xl font-light text-slate-400 outline-none leading-relaxed max-w-3xl hover:text-slate-200 transition-colors duration-300 cursor-text">
          All of your code snippets, unified at one place
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>

      {/* Filters */}
      {isLoading ? (
        <FilterSkeleton />
      ) : (
        <div className="flex flex-wrap gap-3 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Stats and View Toggle */}
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div className="text-sm text-gray-600">
          Showing {filteredSnippets.length} of {snippets.length} snippets
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              viewMode === "list"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div> */}

      {/* Cards Grid */}

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div
          className={`grid gap-5 mb-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`}
        >
          {filteredSnippets.map((snippet) => (
            <Link href={`/snippet/${snippet.uid}`} className="flex justify-center">
              <SnippetCard
                code={snippet.code}
                language={snippet.lang}
                snippet={snippet}
              />
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && filters.length === 0 && (
        <div className="text-center py-12">
          <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            No snippets found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Load More */}
      {/* {filteredSnippets.length > 0 && (
        <div className="flex justify-center mt-10">
          <button className="px-6 py-3 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
            Load More Snippets
          </button>
        </div>
      )} */}
    </div>
  );
};
