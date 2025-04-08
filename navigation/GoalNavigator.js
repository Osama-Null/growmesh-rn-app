import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstGoalScreen from "../screens/FirstGoalScreen";
import GoalTypeScreen from "../screens/GoalTypeScreen";
import GoalDetailsScreen from "../screens/GoalDetailsScreen";
import GoalScheduleScreen from "../screens/GoalScheduleScreen";
// import NewGoal from "../screens/NewGoal";

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
      {/* <Stack.Screen name="NewGoal" component={NewGoal} /> */}
    </Stack.Navigator>
  );
};

export default GoalNavigator;
