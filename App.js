import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
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

  const checkToken = async () => {
    // get the token
    const token = await getToken();
    if (token) {
      // token ? setIsAuth(true) :
      setIsAuth(true);
    }
  };
  useEffect(() => {
    checkToken();
  });

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
});
