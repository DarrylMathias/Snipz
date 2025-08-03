"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import CreateSnippet from "@/components/CreateSnippet";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";
import { adminAuth } from "@/lib/firebase-admin";

interface PageProps {
  params: { snippetId: string };
}

interface Snippet {
  uid: string;
  owner: string;
  title: string;
  subtitle: string;
  code: string;
  lang: string;
  tags: string[];
  isPublic: boolean;
  timestamp: number | Timestamp;
}

export default async function SnippetPage({ params }: PageProps) {
  // try {
    const snippetId = params.snippetId;
    const cookie = cookies();
    const sessionCookie = cookie.get("session")?.value;
    const user = await adminAuth.verifySessionCookie(
      sessionCookie || "",
      true
    );
    const uid = user.uid;
    if (snippetId && typeof snippetId === "string") {
      const docRef = doc(db, "snippet", snippetId);
      const dbSnippet = await getDoc(docRef);
      if (dbSnippet.exists()) {
        const data = dbSnippet.data() as Snippet;
        if (uid === data.owner) {
          console.log('Owner');
          return <CreateSnippet />;
        } else if (data.isPublic === true) {
          console.log("Public");
          return redirect(`/snippetRead/${snippetId}`);
        } else {
          console.log('Private');
          redirect(`/dashboard`);
        }
      }
    }
  // } catch (error) {
  //   console.error("Error:", error);
  //   redirect("/dashboard");
  // }
}
