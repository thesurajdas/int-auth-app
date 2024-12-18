import fetchAPI from "@/lib/apiClient.js";

//Fetch all users
async function getAllUsers(url) {
  const userData = await fetchAPI(url);
  return userData;
}

// Get user by id
async function getUserById(url) {
  const userData = await fetchAPI(url);
  return userData;
}

// Update user by id
async function updateUserById(url, data) {
  const userData = await fetchAPI(url, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return userData;
}

// Delete user by id
async function deleteUserById(url) {
  const userData = await fetchAPI(url, {
    method: "DELETE",
  });
  return userData;
}

export { getAllUsers, getUserById, updateUserById, deleteUserById };
