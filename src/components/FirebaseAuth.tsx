
"use client";

import { useEffect } from "react";
import { auth, googleAuth, githubAuth } from "@/config/firebase.config";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useRouter } from "next/navigation";

export function FirebaseAuth() {
  const router = useRouter();

  useEffect(() => {
    // Prevent multiple instances of FirebaseUI
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        googleAuth.providerId,
        githubAuth.providerId,
        "password"
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          console.log("Login success:", authResult.user);
          router.push("/dashboard");
          return false; // prevent automatic redirect
        },
        signInFailure: function (error) {
          console.error("Login error:", error);
        },
      },
      signInFlow: "popup", // or "redirect"
    });

    return () => {
      ui.delete(); // cleanup on component unmount
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login with Firebase UI</h1>
      <div id="firebaseui-auth-container" />
    </div>
  );
}