import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthNavigation from "./src/navigations/AuthNavigation/AuthNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import MainNavigation from "./src/navigations/MainNavigation/MainNavigation";
import Register from "./src/screens/Auth/Register";

export default function App() {
  const queryClient = new QueryClient();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getToken();
        setIsAuth(!!token);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Checking token...</Text>
      </View>
    );
  }

  return (
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
