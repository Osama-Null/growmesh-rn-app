// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import AuthNavigation from "./src/navigations/AuthNavigation/AuthNavigation";
// import { useEffect, useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import UserContext from "./src/context/UserContext";
// import MainNavigation from "./src/navigations/MainNavigation/MainNavigation";
// import Constants from "expo-constants";
// import { saveApiKey } from "./src/utils/secureStorage";
// import { getToken } from "./src/api/storage";

// export default function App() {
//   const queryClient = new QueryClient();
//   const [isAuth, setIsAuth] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkTokenAndSetApiKey = async () => {
//       try {
//         const token = await getToken();
//         setIsAuth(!!token);
//         const apiKey = Constants.expoConfig.extra.grokApiKey;
//         if (!apiKey) {
//           throw new Error("Grok API key not found in environment variables");
//         }
//         await saveApiKey(apiKey);
//       } catch (error) {
//         console.error("Error setting up API key:", error.message);
//         setIsAuth(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkTokenAndSetApiKey();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Checking token...</Text>
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <QueryClientProvider client={queryClient}>
//         <SafeAreaProvider>
//           <SafeAreaView style={styles.safeArea}>
//             <UserContext.Provider value={{ isAuth, setIsAuth }}>
//                 <StatusBar translucent />
//                 {isAuth ? <MainNavigation /> : <AuthNavigation />}
//             </UserContext.Provider>
//           </SafeAreaView>
//         </SafeAreaProvider>
//       </QueryClientProvider>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FEF7FF",
//   },
//   loadingContainer: {
//     flex: 1,
//     alignSelf: "center",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loadingText: {
//     fontWeight: "bold",
//   },
// });


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

export default function App() {
  const queryClient = new QueryClient();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenAndSetApiKey = async () => {
      try {
        await SecureStore.deleteItemAsync("authToken");
        const token = await getToken();
        console.log("Token retrieved:", token); // Debug: Log the token
        console.log("Token type:", typeof token); // Debug: Log the type of token
        console.log("isAuth will be set to:", !!token); // Debug: Log the boolean value
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

  console.log("Rendering navigation, isAuth:", isAuth); // Debug: Log the final isAuth value

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