import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Svg, Path } from "react-native-svg";
import Dashboard from "../screens/Dashboard";
import GoalNavigator from "./GoalNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  const color = focused ? "#2F3039" : "#1D1B20";

  switch (name) {
    case "Dashboard":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
            fill={color}
            fillOpacity={focused ? 1 : 0.6}
          />
        </Svg>
      );
    case "Goals":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
            fill={color}
            fillOpacity={focused ? 1 : 0.6}
          />
          <Path
            d="M7 12h2v5H7v-5zm4-3h2v8h-2V9zm4-3h2v11h-2V6z"
            fill={color}
            fillOpacity={focused ? 1 : 0.6}
          />
        </Svg>
      );
    case "Profile":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            fill={color}
            fillOpacity={focused ? 1 : 0.6}
          />
        </Svg>
      );
    default:
      return null;
  }
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FEF7FF",
          borderTopWidth: 1,
          borderTopColor: "rgba(0,0,0,0.1)",
          height: 60,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Roboto",
          fontWeight: "500",
        },
        tabBarActiveTintColor: "#2F3039",
        tabBarInactiveTintColor: "rgba(29,27,32,0.6)",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Dashboard" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Goals" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
