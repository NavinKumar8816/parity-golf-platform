import { supabase } from "./supabase";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "" // use Vite proxy in dev
    : import.meta.env.VITE_API_URL; // production backend

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API Error");
  }

  return res.json();
};