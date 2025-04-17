import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GoalHeader = ({ type = "KIDS", amount = "24", total = "25" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <Text style={styles.typeText}>{type}</Text>
      </View>
      <Text style={styles.amountText}>
        KWD {amount} <Text style={styles.totalText}>/ {total}</Text>
      </Text>
      <View style={styles.tabContainer}>
        <Text style={styles.tabText}>
          <Text style={styles.activeTab}>General</Text>
          <Text style={styles.divider}> | </Text>
          <Text style={styles.inactiveTab}>History</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  typeText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  amountText: {
    fontSize: 25,
    fontFamily:  "Roboto",
    fontWeight: "900",
    color: "#000",
    marginTop: 4,
  },
  totalText: {
    color: "rgba(0,0,0,0.8)",
  },
  tabContainer: {
    marginTop: 20,
  },
  tabText: {
    fontSize: 16,
    fontFamily:  "Roboto",
  },
  activeTab: {
    fontWeight: "900",
    textDecorationLine: "underline",
  },
  divider: {
    fontWeight: "900",
  },
  inactiveTab: {
    fontWeight: "900",
    color: "rgba(0,0,0,1)",
  },
});

export default GoalHeader;
