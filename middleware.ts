import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(req : NextRequest){
  console.log("MIDDLEWARE RAN"); // Should appear in terminal
  const isAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";
  console.log("Auth cookie:", req.cookies.get("isAuthenticated")?.value);
    if(isAuthenticated){
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/login", req.url)); 
}

export const config = {
  matcher: ['/create', '/dashboard','/logout','/contact'],
}
