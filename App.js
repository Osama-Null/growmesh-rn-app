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
import EditProfile from "./screens/EditProfile";
import GoalDetails from "./screens/GoalDetails";
import GoalChart from "./components/goals/GoalChart";
import BreakGoal from "./screens/Breakgoal";
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
          {/*  add shadow to lock your goal to show that it is pressable */}
          {/* <Profile /> */}
          {/* <EditProfile /> */}
          {/* <GoalDetails /> */}
          {/* <GoalChart /> */}
          <BreakGoal />
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
