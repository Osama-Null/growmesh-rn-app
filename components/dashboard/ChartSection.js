import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ChartComponent from "./ChartComponent";

const ChartSection = () => {
  return (
    <View style={styles.analyticsSection}>
      <View style={styles.totalSavings}>
        <Text style={styles.savingsLabel}>Total saving</Text>
        <Text style={styles.savingsAmount}>KWD 24.44</Text>
      </View>

      <View style={styles.dateSelector}>
        <TouchableOpacity style={styles.datePicker}>
          <Text style={styles.dateText}>Date</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <ChartComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  analyticsSection: {
    backgroundColor: "#FEF7FF",
    paddingTop: 0,
  },
  totalSavings: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  dateSelector: {
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  chartContainer: {
    marginHorizontal: 16,
    height: 180,
    alignItems: "center",
    marginVertical: 12,
  },
  savingsLabel: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#1E1E1E",
    opacity: 0.6,
    marginBottom: 8,
  },
  savingsAmount: {
    fontFamily:  "Roboto",
    fontSize: 32,
    fontWeight: "800",
    color: "#1E1E1E",
  },
  dateSelector: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  datePicker: {
    backgroundColor: "#2F3039",
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 39,
    minWidth: 100,
    alignItems: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    fontFamily:  "Roboto",
  },
  chartContainer: {
    marginHorizontal: 16,
    height: 180,
    alignItems: "center",
    marginVertical: 20,
  },
});

export default ChartSection;
