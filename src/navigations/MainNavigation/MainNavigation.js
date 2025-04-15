import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import HomeNavigation from '../HomeNavigation/HomeNavigation';
import AddNavigation from '../AddNavigation/AddNavigation';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoryNavigation from '../HistoryNavigation/HistoryNavigation';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    // const { isAuth, setIsAuth } = useContexttext(UserContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
        },
        headerShown: false,
        headerBackButtonMenuEnabled:"false"
      }}
    >
        <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="home" size={24} color={color} />
              ),
            }}
        />
        <Tab.Screen
            name="Add"
            component={AddNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome6 name="add" size={24} color={color} />
              ),
            }}
        />
        <Tab.Screen
            name="History"
            component={HistoryNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="history" size={24} color={color} />
              ),
            }}
        />

    </Tab.Navigator>
  )
}

export default MainNavigation

const styles = StyleSheet.create({})