import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const supabase = await createClient();
  const tokenHash = params.get("token_hash");
  const code = params.get("code");
  const result = tokenHash && params.get("type") === "email"
    ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "email" })
    : code ? await supabase.auth.exchangeCodeForSession(code) : null;
  if (result && !result.error && result.data.user?.email_confirmed_at) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.redirect(new URL("/login?confirmation=error", request.url));
}
