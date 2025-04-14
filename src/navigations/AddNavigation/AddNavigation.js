import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AddNavigation = () => {
  return (
    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="Add"
    //     component={Add}
    //     headerBackButtonMenuEnabled="false"
    //     options={{ headerShown: false }}
    //   />
    // </Stack.Navigator>
    <View>
      <Text>AddNavigation</Text>
    </View>
  )
}

export default AddNavigation

const styles = StyleSheet.create({})