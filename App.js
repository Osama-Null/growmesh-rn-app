import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthNavigation from "./src/navigations/AuthNavigation/AuthNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import MainNavigation from "./src/navigations/MainNavigation/MainNavigation";
import Constants from "expo-constants";
import { saveApiKey } from "./src/utils/secureStorage";
import { getToken } from "./src/api/storage";
import * as SecureStore from "expo-secure-store";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  const queryClient = new QueryClient();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenAndSetApiKey = async () => {
      try {
        await SecureStore.deleteItemAsync("authToken");
        const token = await getToken();
        setIsAuth(!!token);
        const apiKey = Constants.expoConfig.extra.grokApiKey;
        if (!apiKey) {
          throw new Error("Grok API key not found in environment variables");
        }
        await saveApiKey(apiKey);
      } catch (error) {
        console.error("Error setting up API key:", error.message);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkTokenAndSetApiKey();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Checking token...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
              <UserContext.Provider value={{ isAuth, setIsAuth }}>
                <StatusBar translucent />
                {isAuth ? <MainNavigation /> : <AuthNavigation />}
              </UserContext.Provider>
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  loadingContainer: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontWeight: "bold",
  },
});
