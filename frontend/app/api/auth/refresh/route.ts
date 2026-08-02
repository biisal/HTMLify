import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { setCookie } from "@/app/api/auth/utils";
import { RefreshToken } from "@/lib/modules/auth/auth.actions";

export async function GET() {
  const result = await RefreshToken();

  if (result.status !== 200 || !result.access_token) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: result.status || 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const cookieStore = await cookies();
  console.log("setting cookie");
  await setCookie(cookieStore, result.access_token, "access_token");

  return NextResponse.json({ access_token: result.access_token });
}
