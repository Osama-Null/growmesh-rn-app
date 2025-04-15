import instance from ".";
import { setToken } from "./storage";

// Login function
const login = async (userInfo) => {
  const response = await instance.post("/auth/login", {...userInfo});
  console.log("LOGIN TOKEN", response.data.token);
  setToken(response.data.token);
  return response.data;
};
const register = async (userInfo, image) => {
  const formData = new FormData();

  for (key in userInfo) {
    formData.append(key, userInfo[key]);
  }  formData.append("ProfilePicture", {
    name: "image.jpeg",
    type: "image/jpeg",
    uri: image,
  });

 
  const res = await instance.post("/auth/register", formData);

  console.log(res);

  setToken(res.data.token);

  return res.data;
};
export {login, register};
