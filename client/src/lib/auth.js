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
    if (response.status === 403 && includeAuth) {
      // Redirect to login if refresh fails
      window.location.href = "/login";
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
}

// Login function
async function login(email, password) {
  const data = await fetchAPI(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    false // No token needed for login
  );

  // No need to manually store tokens; they are handled by cookies
  return data;
}

// Register function
async function register(name, email, password) {
  await fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

// Fetch current user
async function getCurrentUser() {
  return fetchAPI("/user/me");
}

// Logout function
async function logout() {
  await fetchAPI("/auth/logout", {
    method: "DELETE",
  });

  // Redirect to login after logout
  window.location.href = "/login";
}

export { login, register, getCurrentUser, logout };
