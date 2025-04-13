import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GoalProgress = ({ progress = 60 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>{progress}%</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%",
  },
  progressText: {
    color: "#B537C6",
    fontSize: 54,
    fontFamily: "Roboto",
    fontWeight: "900",
    marginTop: 19,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#E6E0E9",
    borderRadius: 64,
    marginTop: 14,
  },
  progressBar: {
    height: "100%",
   backgroundColor: "#B537C6",
    borderRadius: 64,
  },
});

export default GoalProgress;
