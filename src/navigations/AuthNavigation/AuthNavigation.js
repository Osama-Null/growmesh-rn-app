import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Auth/Login";
import Register from "../../screens/Auth/Register";
import Welcome from "../../screens/Auth/Welcome";
import Faq from "../../screens/Faq/Faq";
import HomeScreen from "../../screens/Home/HomeScreen";
import SavingsGoalDetails from "../../screens/Home/SavingsGoalDetails";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SavingsGoalDetails" component={SavingsGoalDetails} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Faq" component={Faq} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
