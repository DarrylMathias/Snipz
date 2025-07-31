import { initializeApp, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccountRaw from "@/lib/firebaseAdminJson.json";

const serviceAccount: ServiceAccount = {
  ...serviceAccountRaw,
  private_key: serviceAccountRaw.private_key.replace(/\\n/g, '\n')
} as ServiceAccount;

const app =
  getApps().length === 0
    ? initializeApp({ credential: cert(serviceAccount) })
    : getApps()[0];

export const adminAuth = getAuth(app);