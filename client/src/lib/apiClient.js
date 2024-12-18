const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

// Helper to make API requests
async function fetchAPI(url, options = {}, includeAuth = true) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include", // Include cookies in requests
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 403 && includeAuth) {
      return { error: "unauthorized" }; // Prevent infinite redirect loop
    }
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
}

export default fetchAPI;