import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstGoalScreen from "../screens/FirstGoalScreen";
import Dashboard from "../screens/Dashboard";
import GoalTypeScreen from "../screens/GoalTypeScreen";
import GoalDetailsScreen from "../screens/GoalDetailsScreen";
import GoalScheduleScreen from "../screens/GoalScheduleScreen";
const Stack = createNativeStackNavigator();

const GoalNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FEF7FF" },
      }}
    >
      <Stack.Screen name="FirstGoal" component={FirstGoalScreen} />
      <Stack.Screen name="GoalType" component={GoalTypeScreen} />
      <Stack.Screen name="GoalDetails" component={GoalDetailsScreen} />
      <Stack.Screen name="GoalSchedule" component={GoalScheduleScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default GoalNavigator;
