import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthNavigator from "./navigation/AuthNavigator";
import Dashboard from "./screens/Dashboard";
import NewGoal from "./screens/NewGoal";
import FirstGoalScreen from "./screens/FirstGoalScreen";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          {/* <AuthNavigator /> */}
          {/* <Dashboard /> */}
          {/* <NewGoal /> */}
          <FirstGoalScreen />

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
