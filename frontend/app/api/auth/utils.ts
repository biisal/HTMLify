"use server";
import { env } from "@/lib/env";

type CookieSetter = {
  set(
    name: string,
    value: string,
    options?: {
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "lax" | "strict" | "none";
      maxAge?: number;
      path?: string;
    },
  ): void;
};

async function setCookie(
  cookieStore: CookieSetter,
  token: string,
  type: "access_token" | "refresh_token",
) {
  cookieStore.set(type, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:
      60 *
      (type === "access_token"
        ? env.ACCESS_TOKEN_EXPIRE_MINUTES
        : 60 * 24 * env.REFRESH_TOKEN_EXPIRE_DAYS),
    path: "/",
  });
}

export { setCookie };
