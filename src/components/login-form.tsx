"use client";
export const dynamic = "force-dynamic";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  actionCodeSettings,
  auth,
  githubAuth,
  googleAuth,
} from "@/config/firebase.config";
import {
  getIdToken,
  sendSignInLinkToEmail,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [data, setData] = useState({ email: "", password: "" });

  const router = useRouter();

  const loginGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await signInWithPopup(auth, googleAuth);
      const idToken = await getIdToken(auth.currentUser!, true);
      console.log("Saved token", idToken);
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
  };

  const loginGithub = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await signInWithPopup(auth, githubAuth);
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
  };

  const fillData = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        console.log(err);
        toast.error(err.message);
      } else {
        console.log("Unknown error:", err);
        toast.error("Something went wrong!");
      }
    }
  };

  const loginEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
      console.log("Link sent");

      if (typeof window !== "undefined") {
        window.localStorage.setItem("emailForSignIn", data.email);
      }
      console.log(auth.currentUser);
      toast.success(
        `A sign-in email with additional instructions was sent to ${data.email}. Check your email to complete sign-in.`
      );
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        console.log(err.cause);
        toast.error(err.code);
      } else {
        console.log("Unknown error:", err);
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            onChange={fillData}
            required
          />
        </div>
        {/* <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
             <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> 
          </div>
          <Input id="password" type="password" name="password" onChange={fillData}/>
        </div> */}
        <Button type="submit" className="w-full" onClick={loginEmail}>
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full" onClick={loginGoogle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4 mr-2"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
        <Button variant="outline" className="w-full" onClick={loginGithub}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
      </div>
    </form>
  );
}
