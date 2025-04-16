import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../../screens/Home/HomeScreen';
import { Header } from '@react-navigation/elements';
import CreateGoalScreen from '../../screens/Add/CreateGoalScreen';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: "false",
      }}
    >
      <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigation

const styles = StyleSheet.create({})