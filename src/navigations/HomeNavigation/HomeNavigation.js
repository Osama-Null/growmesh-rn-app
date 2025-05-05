import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/Home/HomeScreen";
import AllSavingsGoals from "../../screens/Home/AllSavingsGoals";
import SavingsGoalDetails from "../../screens/Home/SavingsGoalDetails";
import EditSavingsGoal from "../../screens/Home/EditSavingsGoal";
import Faq from "../../screens/Faq/Faq";
import Notifications from "../../screens/Notifications/Notifications";
import ProfileScreen from "../../screens/Profile/ProfileScreen";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: "false",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SavingsGoalDetails" component={SavingsGoalDetails} />
      <Stack.Screen name="EditSavingsGoal" component={EditSavingsGoal} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AllSavingsGoals" component={AllSavingsGoals} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Faq" component={Faq} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
