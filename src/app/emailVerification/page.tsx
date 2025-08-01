"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store"; // ⬅️ prevents caching

import {
  getIdToken,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "@/config/firebase.config";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";

// Confirm the link is a sign-in with email link.

const EmailVerfication = () => {
  const router = useRouter();

  useEffect(() => {
    const confirmSignin = async () => {
      if (typeof window !== "undefined") {
        const email = window.localStorage.getItem("emailForSignIn");
        if (isSignInWithEmailLink(auth, window.location.href)) {
          // Additional state parameters can also be passed via URL.
          // This can be used to continue the user's intended action before triggering
          // the sign-in operation.
          // Get the email if available. This should be available if the user completes
          // the flow on the same device where they started it.
          if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            toast.error("Please provide your email for confirmation");
            router.push("/login");
          }
          // The client SDK will parse the code from the link for you.
          try {
            await signInWithEmailLink(auth, email || "", window.location.href);
            window.localStorage.removeItem("emailForSignIn");
            toast.success("Sign-in successful!");
            const idToken = await getIdToken(auth.currentUser!, true);
            await fetch("/api/session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken }),
            });
            router.push("/dashboard");
          } catch (err: unknown) {
            if (err instanceof FirebaseError) {
              console.log(err);
              toast.error(err.message);
            } else {
              console.log("Unknown error:", err);
              toast.error("Something went wrong!");
            }
          }
        }
      }
    };
    confirmSignin();
  }, [router]);
  return (
    <div>
      <p>Verifying your sign-in link...</p>
    </div>
  );
};

export default EmailVerfication;
