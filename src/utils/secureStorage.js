import * as SecureStore from "expo-secure-store";

export const saveApiKey = async (key) => {
  try {
    await SecureStore.setItemAsync("grokApiKey", key);
  } catch (error) {
    console.error("Error saving API key:", error.message);
    throw error;
  }
};

export const getApiKey = async () => {
  try {
    const key = await SecureStore.getItemAsync("grokApiKey");
    return key;
  } catch (error) {
    console.error("Error retrieving API key:", error.message);
    throw error;
  }
};
