import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthNavigator from "./navigation/AuthNavigator";
import TabNavigator from "./navigation/TabNavigator";
import History from "./screens/History";
import MainNavigator from "./navigation/MainNavigator";
import LockScreen from "./screens/LockScreen";
import GoalNavigator from "./navigation/GoalNavigator";
import Profile from "./screens/Profile";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          {/* <AuthNavigator /> */}
          {/* <TabNavigator /> */}
          {/* <History /> */}
          {/* <MainNavigator /> */}
          {/* <AuthNavigator /> */}
          {/* <LockScreen /> */}
          {/* <GoalNavigator /> */}
          <Profile />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
});
