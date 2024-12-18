import fetchAPI from "@/lib/apiClient.js";

const editProfile = async (userData) => {
  await fetchAPI("/user/me", {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

export { editProfile };
