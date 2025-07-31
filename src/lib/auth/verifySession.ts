import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

export async function verifySession() {
  const cookie = await cookies();
  const session = cookie.get("session")?.value;

  if (!session) return false;

  try {
    const res = await adminAuth.verifySessionCookie(session, true); // checkRevoked: true
    console.log(res);
    return true;
  } catch {
    return false;
  }
}
