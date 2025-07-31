"use server"

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

export default async function logout() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (sessionCookie) {
    try {
      const decoded = await adminAuth.verifySessionCookie(sessionCookie);
      await adminAuth.revokeRefreshTokens(decoded.sub);
    } catch (err) {
      console.error("Invalid session cookie");
    }
  }

  cookieStore.delete("session");

  return new Response("Logged out", { status: 200 });
}
