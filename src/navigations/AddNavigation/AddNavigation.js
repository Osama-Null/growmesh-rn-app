import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroAdd from "../../screens/Add/IntroAdd";
import AddGoal from "../../screens/Add/AddGoal";
import AmountBased from "../../screens/Add/AmountBased";
import TimeBased from "../../screens/Add/TimeBased";
import Step2 from "../../screens/Add/Step2";
import Step3Final from "../../screens/Add/Step3Final";

const Stack = createNativeStackNavigator();

const AddNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: false,
      }}
    >
      <Stack.Screen name="IntroAdd" component={IntroAdd} />
      <Stack.Screen name="AddGoal" component={AddGoal} />
      <Stack.Screen name="AmountBased" component={AmountBased} />
      <Stack.Screen name="TimeBased" component={TimeBased} />
      <Stack.Screen name="Step2" component={Step2} />
      <Stack.Screen name="Step3Final" component={Step3Final} />
    </Stack.Navigator>
  );
};

export default AddNavigation;
