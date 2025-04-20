import instance from ".";

// Get user profile
const getProfile = async () => {
  const response = await instance.get("/User/profile");
  return response.data;
};

// Edit user profile
const editProfile = async (userInfo, image) => {
  const formData = new FormData();

  // Append user info fields (only if provided)
  if (userInfo.email) formData.append("Email", userInfo.email);
  if (userInfo.phone) formData.append("Phone", userInfo.phone);
  formData.append("Password", userInfo.password);

  // Append profile picture if provided
  if (image) {
    const fileExtension = image.split(".").pop().toLowerCase();
    const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";
    formData.append("ProfilePicture", {
      name: `profile.${fileExtension}`,
      type: mimeType,
      uri: image,
    });
  }

  const response = await instance.put("/User/edit-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Change password
const changePassword = async (passwordInfo) => {
  const response = await instance.put("/User/change-password", passwordInfo);
  return response.data;
};

// Forgot password
const forgotPassword = async (passwordInfo) => {
  const response = await instance.post("/User/forgot-password", passwordInfo);
  return response.data;
};

export { getProfile, editProfile, changePassword, forgotPassword };
