import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateGoalScreen from "../../screens/Add/CreateGoalScreen";

const Stack = createNativeStackNavigator();

const AddNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: false,
      }}
    >
      <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
    </Stack.Navigator>
  );
};

export default AddNavigation;
