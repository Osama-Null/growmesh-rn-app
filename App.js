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
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

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
      <AppContent isAuth={isAuth} queryClient={queryClient} />
    </ThemeProvider>
  );
}

const AppContent = ({ isAuth, queryClient }) => {
  const { theme, themeReady } = useTheme();

  // Wait for theme to be ready before rendering
  if (!themeReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading theme...</Text>
      </View>
    );
  }

  // Dynamically set the background color based on the theme
  const safeAreaBackgroundColor = theme === "light" ? "#FEF7FF" : "#292848";

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: safeAreaBackgroundColor,
            }}
          >
            <UserContext.Provider value={{ isAuth, setIsAuth: () => {} }}>
              <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={theme === "light" ? "dark-content" : "light-content"}
              />
              {isAuth ? <MainNavigation /> : <AuthNavigation />}
            </UserContext.Provider>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
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
