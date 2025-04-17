import instance from ".";

// GET USER PROFILE
const getProfile = async () => {
  const response = await instance.get("/User/profile");
  return response.data;
};

// EDIT USER PROFILE
const editProfile = async (userInfo, image) => {
  const formData = new FormData();
  for (key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  formData.append("ProfilePicture", {
    name: "image.jpeg",
    type: "image/jpeg",
    uri: image,
  });
  const response = await instance.put("/User/profile");
  return response.data;
};

// CHANGE USER PASSWORD
const changePassword = async (userInfo) => {
  const formData = new FormData();
  for (key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const response = await instance.put("/User/chamge-password");
  return response.data;
};

export { editProfile, getProfile, changePassword };
