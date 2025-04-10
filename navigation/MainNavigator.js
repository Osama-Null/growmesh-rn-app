import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthNavigator from './AuthNavigator';
import GoalNavigator from './GoalNavigator';
import ProfileNavigator from './ProfileNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstGoalScreen from '../screens/FirstGoalScreen';
import GoalLockScreen from '../screens/GoalLockScreen';
import TargetDateScreen from '../screens/TargetDateScreen';
import GoalTypeScreen from '../screens/GoalTypeScreen';
import GoalDetailsScreen from '../screens/GoalDetailsScreen';
import GoalScheduleScreen from '../screens/GoalScheduleScreen';
import Dashboard from '../screens/Dashboard';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator ();
const MainNavigator = () => {
  return (
        <Tab.Navigator>
      <Tab.Screen name="FirstGoal" component={FirstGoalScreen} />
      <Tab.Screen name="GoalLock" component={GoalLockScreen} />
      <Tab.Screen name="TargetDate" component={TargetDateScreen} />
      <Tab.Screen name="GoalType" component={GoalTypeScreen} />
      <Tab.Screen name="GoalDetails" component={GoalDetailsScreen} />
      <Tab.Screen name="GoalSchedule" component={GoalScheduleScreen} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name ="Profile" component={Profile} />
      <Tab.Screen name="EditProfile" component={EditProfile} />      

    </Tab.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})