import { env } from "@/lib/env";
import { APICall } from "@/lib/fetch/api";
import { PenResponse } from "@/lib/modules/pen/pen.schema";

async function createPen(title: string) {
  const { response, error } = await APICall(
    `${env.NEXT_PUBLIC_BACKEND_API_URL}/v1/pens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    },
  );
  if (error || !response) {
    return { data: null, error: error || "Failed to create pen" };
  }
  return {
    data: (await response.json()) as PenResponse,
    error: null,
  };
}

interface UpdatePenParams {
  id: string;
  title: string;
  head_content: string;
  body_content: string;
  css_content: string;
  js_content: string;
}

function stringToBase64(str: string) {
  return Buffer.from(str).toString("base64");
}
function base64ToString(base64: string) {
  return Buffer.from(base64, "base64").toString("utf-8");
}
async function updatePen(updatePenParams: UpdatePenParams) {
  const { id, ...rest } = updatePenParams;
  console.log({ id, update: rest });

  rest.body_content = stringToBase64(rest.body_content);
  rest.head_content = stringToBase64(rest.head_content);
  rest.css_content = stringToBase64(rest.css_content);
  rest.js_content = stringToBase64(rest.js_content);

  const { response, error } = await APICall(
    `${env.NEXT_PUBLIC_BACKEND_API_URL}/v1/pens/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    },
  );
  if (error || !response) {
    return { data: null, error: error || "Failed to update pen" };
  }
  return {
    data: (await response.json()) as PenResponse,
    error: null,
  };
}

async function getPenById(id: string) {
  const { response, error } = await APICall(
    `${env.NEXT_PUBLIC_BACKEND_API_URL}/v1/pens/${id}?show_content=true`,
  );
  if (error || !response) {
    return { data: null, error: error || "Failed to get pen" };
  }
  const data = (await response.json()) as PenResponse;
  console.log({ raw: data });

  data.head_content = base64ToString(data.head_content);
  data.body_content = base64ToString(data.body_content);
  data.css_content = base64ToString(data.css_content);
  data.js_content = base64ToString(data.js_content);

  return {
    data: data,
    error: null,
  };
}

export { createPen, getPenById, updatePen };
