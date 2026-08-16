import { HttpError } from "./errors/HttpError";

const API_URL = import.meta.env.VITE_API_URL;
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || null),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");

  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    let responseMessage = `Request failed with status ${response.status}`
    if(isJson){
      const reponseData = await response.json(); 
      responseMessage = reponseData?.message;
    }
    throw new HttpError(response.status, responseMessage, endpoint);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  
  if (!isJson) {
    return undefined as T;
  }

  return (await response.json()) as T;
}


