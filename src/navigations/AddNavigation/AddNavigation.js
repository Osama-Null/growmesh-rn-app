import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AddNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled:"false"
      }}
    >
      <Stack.Screen
        name="Add"
        component={Add}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AddNavigation

const styles = StyleSheet.create({})