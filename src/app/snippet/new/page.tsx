"use client";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth, db } from "@/config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { LoaderFive, LoaderThree } from "@/components/ui/loader";
import toast from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const redirectUser = onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        const newSnippet = {
          uid: "",
          owner: user.uid,
          title: "Cat Talk",
          subtitle: "What does the cat say?",
          code: `console.log("Meow 🐾");`,
          lang: "javascript",
          tags: ["nextjs", "react"],
          isPublic: false,
          timestamp: Date.now(),
        };
        const docRef = await addDoc(collection(db, "snippet"), newSnippet);
        await setDoc(
          doc(db, "snippet", docRef.id),
          {
            uid: docRef.id,
          },
          { merge: true }
        );
        toast.success(`Redirect success`);
        router.replace(`/snippet/${docRef.id}`);
      });
      return () => redirectUser();
    } catch (err) {
      toast.error(`Error occured ${err}`);
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <LoaderThree />
      <LoaderFive text="Loading snippet screen..." />
    </div>
  );
}
