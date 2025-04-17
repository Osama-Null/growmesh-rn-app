import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HistoryNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: false,
      }}
    >
      {/* Add History screens here */}
    </Stack.Navigator>
  );
};

export default HistoryNavigation;
