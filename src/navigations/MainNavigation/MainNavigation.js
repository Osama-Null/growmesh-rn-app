import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import AddNavigation from "../AddNavigation/AddNavigation";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[
              styles.bubble,
              isFocused ? styles.bubbleFocused : styles.bubbleInactive,
            ]}
          >
            {options.tabBarIcon({
              color: isFocused ? "#00F8BE" : "#2F3039",
              size: 24,
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="HomeNav"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNav"
        component={AddNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="plus" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HistoryNav"
        component={HistoryNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
        }}
      />
   
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 20,
  },
  bubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleFocused: {
    backgroundColor: "rgba(120, 120, 128, 0.12)",
    transform: [{ scale: 1.1 }],
  },
  bubbleInactive: {
    backgroundColor: "rgba(120, 120, 128, 0.12)",
  },
});
