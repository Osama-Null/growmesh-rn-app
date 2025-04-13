import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoalHeader from "../components/goals/GoalHeader";
import GoalProgress from "../components/goals/GoalProgress";
import ChartSection from "../components/dashboard/ChartSection";
import GoalChart from "../components/goals/GoalChart";
const GoalDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <GoalHeader />
        <GoalChart />
        <GoalProgress />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
});

export default GoalDetails;
