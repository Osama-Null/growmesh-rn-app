import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/Home/HomeScreen";
import { Header } from "@react-navigation/elements";
import AllSavingsGoals from "../../screens/Home/AllSavingsGoals";
import CreateGoalScreen from "../../screens/Add/CreateGoalScreen";
import SavingsGoalDetails from "../../screens/Home/SavingsGoalDetails";
import EditGoalScreen from "../../screens/Add/EditGoalScreen";
import Profile from "../../screens/Profile/Profile"

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
      <Stack.Screen name="AllSavingsGoals" component={AllSavingsGoals} /> 
      <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
      <Stack.Screen name="SavingsGoalDetails" component={SavingsGoalDetails} />
      <Stack.Screen name="EditGoal" component={EditGoalScreen} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
