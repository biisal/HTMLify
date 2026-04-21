import { parseServerError } from "@/lib/errors";
let clientRefreshPromise: Promise<boolean> | null = null;

async function executeClientRefresh() {
  if (clientRefreshPromise) return clientRefreshPromise;
  clientRefreshPromise = fetch(`/api/auth/refresh`, {
    method: "GET",
    credentials: "include",
  })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => {
      clientRefreshPromise = null;
    });
  return clientRefreshPromise;
}

type APIResponse =
  | {
      response: Response;
      error: null;
    }
  | {
      response: null;
      error: string;
    };

export async function APICall(
  url: string,
  options: RequestInit = {},
): Promise<APIResponse> {
  const isServer = typeof window === "undefined";

  try {
    if (isServer) {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      let token = cookieStore.get("access_token")?.value;

      const performServerRefresh = async () => {
        const refreshTokenValue = cookieStore.get("refresh_token")?.value;
        if (!refreshTokenValue) return null;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/v1/auth/refresh`,
            { headers: { Cookie: `refresh_token=${refreshTokenValue}` } },
          );
          if (res.ok) {
            const data = await res.json();
            return data.access_token;
          }
        } catch (e) {
          console.error(e);
        }
        return null;
      };

      if (!token) {
        const refreshedToken = await performServerRefresh();
        if (refreshedToken) token = refreshedToken;
      }

      const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
      };
      if (token) {
        headers["Cookie"] = `access_token=${token}`;
      }

      let response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        const refreshedToken = await performServerRefresh();
        if (!refreshedToken) {
          return { response: null, error: "Failed token refresh" };
        }
        headers["Cookie"] = `access_token=${refreshedToken}`;
        response = await fetch(url, { ...options, headers });
      }
      if (!response.ok) {
        return {
          response: null,
          error: await parseServerError(response, "Failed to fetch"),
        };
      }

      return { response: response, error: null };
    } else {
      console.log("this is client");
      let response = await fetch(url, {
        credentials: "include",
        ...options,
      });

      if (response.status === 401) {
        const refreshed = await executeClientRefresh();
        if (refreshed) {
          response = await fetch(url, {
            credentials: "include",
            ...options,
          });
        }
      }
      if (!response.ok) {
        return {
          response: null,
          error: await parseServerError(response, "Failed to fetch"),
        };
      }
      return { response: response, error: null };
    }
  } catch (e) {
    console.log(e);
    return { response: null, error: "Failed to fetch" };
  }
}
