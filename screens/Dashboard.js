import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChartSection from "../components/dashboard/ChartSection";
import TransactionList from "../components/dashboard/TransactionList";

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>

      <ChartSection />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Saving Goals</Text>
        <Text style={styles.sectionSubtitle}>Track your progress</Text>
      </View>

      <TransactionList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
    paddingTop: 0,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Roboto",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#1e1e1e80",
    marginTop: 4,
    fontFamily: "Roboto",
  },
});

export default Dashboard;
