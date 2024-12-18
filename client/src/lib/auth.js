import fetchAPI from "./apiClient.js";

// Login function
async function login(email, password) {
  const data = await fetchAPI(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    false
  ); // No token needed for login

  return data;
}

// Register function
async function register(name, email, password) {
  await fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  await verifyEmail(email);
}

// Fetch current user
async function getCurrentUser() {
  const userData = await fetchAPI("/user/me", { cache: "no-store" });

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

const forgotPassword = async (email) => {
  await fetchAPI("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

const resetPassword = async (token, password) => {
  await fetchAPI("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
};

const verifyEmail = async (email) => {
  await fetchAPI("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

const confirmEmail = async (email, otp) => {
  await fetchAPI("/auth/confirm-email", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
};

export {
  fetchAPI,
  login,
  register,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  confirmEmail,
};
