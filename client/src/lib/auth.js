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

// Login function
async function login(email, password) {
  const data = await fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }, false); // No token needed for login

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
  const userData = await fetchAPI("/user/me");

  if (userData.error === "unauthorized") {
    return null; // Handle unauthorized state
  }

  return userData;
}

//Fetch all users
async function getAllUsers(url) {
  const userData = await fetchAPI(url);

  if (userData.error === "unauthorized") {
    return null; // Handle unauthorized state
  }

  return userData;
}

// Logout function
async function logout() {
  await fetchAPI("/auth/logout", {
    method: "DELETE",
  });

  window.location.href = "/login"; // Redirect after logout
}

export { login, register, getCurrentUser, logout , getAllUsers};
