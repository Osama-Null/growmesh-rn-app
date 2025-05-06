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
  if (userInfo.Email) formData.append("Email", userInfo.Email);
  if (userInfo.Phone) formData.append("Phone", userInfo.Phone);
  if (userInfo.Password) formData.append("Password", userInfo.Password);

  // Append profile picture if provided
  if (image) {
    const uriParts = image.split(".");
    const fileType = uriParts[uriParts.length - 1];
    formData.append("ProfilePicture", {
      uri: image,
      name: `profile.${fileType}`,
      type: `image/${fileType === "png" ? "png" : "jpeg"}`,
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

const profileAgent = async (message) => {
  const response = await instance.post("/User/profile-agent", { message });
  return response.data;
};

export {
  getProfile,
  editProfile,
  changePassword,
  forgotPassword,
  profileAgent,
};
