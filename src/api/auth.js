import instance from ".";
import { setToken } from "./storage";

// Login function
const login = async (userInfo) => {
  const response = await instance.post("/auth/login", { ...userInfo });
  console.log("LOGIN TOKEN", response.data.token);
  setToken(response.data.token);
  return response.data;
};
const register = async (userInfo, image) => {
  const formData = new FormData();

  // Append user info fields
  for (const key in userInfo) {
    formData.append(key, userInfo[key]);
  }

  if (image) {
    const fileExtension = image.split(".").pop().toLowerCase();
    const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";
    formData.append("ProfilePicture", {
      name: `profile.${fileExtension}`,
      type: mimeType,
      uri: image,
    });
  }

  const res = await instance.post("/Auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  await setToken(res.data.token);
  return res.data;
};
export { login, register };