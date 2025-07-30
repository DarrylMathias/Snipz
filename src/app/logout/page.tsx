"use client"
import { auth } from "@/config/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const logout = () => {
  const router = useRouter();
  document.cookie = "isAuthenticated=false; path=/";
  signOut(auth);
  return router.push("/");
};

export default logout;
