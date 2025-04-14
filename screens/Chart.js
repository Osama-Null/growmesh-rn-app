import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

const savingsGoals = [
  { id: "1", title: "Travel", amount: 100, color: "#71CEC1" },
  { id: "2", title: "Kids", amount: 24, color: "#A278F5" },
  { id: "3", title: "Rent", amount: 24.44, color: "#F18B8B" },
];

const chartData = [10, 15, 20, 18, 25, 22, 30];

export default function DashboardScreen() {
  const renderGoal = ({ item }) => (
    <View style={styles.goalCard}>
      <View style={[styles.goalIcon, { backgroundColor: item.color }]} />
      <Text style={styles.goalText}>{item.title}</Text>
      <Text style={styles.goalAmount}>KWD {item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.totalSavingLabel}>Total Saving</Text>
      <Text style={styles.totalSavingValue}>KWD 24.44</Text>

      <TouchableOpacity style={styles.dateButton}>
        <Text style={styles.dateButtonText}>Date ▼</Text>
      </TouchableOpacity>

      <LineChart
        style={styles.chart}
        data={chartData}
        svg={{ stroke: "#71CEC1" }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
      >
        <Grid />
      </LineChart>

      <FlatList
        data={savingsGoals}
        renderItem={renderGoal}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  totalSavingLabel: { fontSize: 16, color: "#999" },
  totalSavingValue: { fontSize: 28, fontWeight: "bold", marginVertical: 5 },
  dateButton: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  dateButtonText: { fontSize: 14, color: "#444" },
  chart: { height: 200 },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  goalIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 10,
  },
  goalText: { flex: 1, fontSize: 16 },
  goalAmount: { fontWeight: "bold" },
});
