import instance from ".";

// GET USER PROFILE
const getProfile = async () => {
  const response = await instance.get("/User/profile");
  return response.data;
};

// EDIT USER PROFILE
const editProfile = async (userInfo, image) => {
  const formData = new FormData();

  // Add user info to form data
  Object.keys(userInfo).forEach((key) => {
    if (userInfo[key] !== null && userInfo[key] !== undefined) {
      formData.append(key, userInfo[key]);
    }
  });

  // Add image if provided
  if (image) {
    const imageFileName = image.split("/").pop();
    const match = /\.(\w+)$/.exec(imageFileName);
    const imageType = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("ProfilePicture", {
      uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
      name: imageFileName || "profile.jpg",
      type: imageType,
    });
  }

  const response = await instance.put("/User/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// CHANGE USER PASSWORD
const changePassword = async (userInfo) => {
  const formData = new FormData();
  for (key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const response = await instance.put("/User/change-password", formData);
  return response.data;
};

export { editProfile, getProfile, changePassword };
