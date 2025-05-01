import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

const setToken = async (token) => {
  await setItemAsync("token", token);
};

const getToken = async () => {
  const token = await getItemAsync("token");
  return token;
};

const deleteToken = async () => {
  await deleteItemAsync("token");
};

export { setToken, getToken, deleteToken };
