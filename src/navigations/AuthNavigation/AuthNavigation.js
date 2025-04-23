import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Auth/Login";
import Register from "../../screens/Auth/Register";
import Welcome from "../../screens/Auth/Welcome";
import Faq from "../../screens/Faq/Faq";
import SavingsGoalDetails from "../../screens/Home/SavingsGoalDetails";
import DatePickerScreen from "../../screens/testing/DatePickerScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: false,
      }}
    >
      {/* <Stack.Screen name="DatePickerScreen" component={DatePickerScreen} /> */}
      {/* <Stack.Screen name="test" component={test} /> */}
      {/* <Stack.Screen name="EditSavingsGoal" component={EditSavingsGoal} /> */}
<<<<<<< HEAD
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SavingsGoalDetails" component={SavingsGoalDetails} />
      <Stack.Screen name="Faq" component={Faq} />
=======
      {/* <Stack.Screen name="Faq" component={Faq} /> */}
      {/* <Stack.Screen name="SavingsGoalDetails" component={SavingsGoalDetails} /> */}
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
>>>>>>> 09de84153347f57549bddf2d18781944215f96e5
    </Stack.Navigator>
  );
};

export default AuthNavigator;
