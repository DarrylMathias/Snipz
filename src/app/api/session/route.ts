import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { idToken } = await req.json();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
  console.log('Session cookie generated is',sessionCookie);
  
  const cookieStore = await cookies();
  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: expiresIn / 1000,
  });

  return new Response("Logged in", { status: 200 });
}
