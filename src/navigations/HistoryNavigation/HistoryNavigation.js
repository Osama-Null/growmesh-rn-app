import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionHistory from "../../screens/History/TransactionHistory";

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
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
    </Stack.Navigator>
  );
};

export default HistoryNavigation;
