import instance from ".";
import { setToken } from "./storage";

// Login function
const login = async (userInfo) => {
  const response = await instance.post("/login", {...userInfo});
  setToken(response.data.token);
  return response.data;
};

// Register function
const register = async (userInfo) => {
    const formData = new FormData();
    Object.keys(userInfo).forEach((key) => {
      formData.append(key, userInfo[key]);
    });
  
    const response = await instance.post("/Auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setToken(response.data.token);
    return response.data;
  };
  
  export { login, register };