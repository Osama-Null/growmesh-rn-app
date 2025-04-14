import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import HomeNavigation from '../HomeNavigation/HomeNavigation';
import AddNavigation from '../AddNavigation/AddNavigation';
import FaqNavigation from '../FaqNavigation/FaqNavigation';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    // const { isAuth, setIsAuth } = useContexttext(UserContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}
    >
        <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Feather name="home" size={24} color={color} />
              ),
            }}
        />
        <Tab.Screen
            name="Add"
            component={AddNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesome6 name="add" size={24} color={color} />
              ),
            }}
        />
        <Tab.Screen
            name="FAQ"
            component={FaqNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesome6 name="question" size={24} color={color} />
              ),
            }}
        />

    </Tab.Navigator>
  )
}

export default MainNavigation

const styles = StyleSheet.create({})