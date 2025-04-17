import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getSavingsGoal } from "../../api/savingsGoal";

const SavingsGoalDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const goalId = route.params?.goalId;

  const {
    data: goal,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["goal", goalId],
    queryFn: () => getSavingsGoal(goalId),
  });

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || !goal) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Error loading goal details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Goal Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{goal.savingsGoalName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Target Amount:</Text>
          <Text style={styles.value}>KWD {goal.targetAmount}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Current Amount:</Text>
          <Text style={styles.value}>KWD {goal.currentAmount}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Progress:</Text>
          <Text style={styles.value}>
            {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Lock Type:</Text>
          <Text style={styles.value}>{goal.lockType}</Text>
        </View>

        {goal.targetDate && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Target Date:</Text>
            <Text style={styles.value}>
              {new Date(goal.targetDate).toLocaleDateString()}
            </Text>
          </View>
        )}

        {goal.depositFrequency && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Deposit Frequency:</Text>
            <Text style={styles.value}>{goal.depositFrequency}</Text>
          </View>
        )}

        {goal.depositAmount && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Deposit Amount:</Text>
            <Text style={styles.value}>KWD {goal.depositAmount}</Text>
          </View>
        )}

        {goal.customDepositIntervalDays && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Custom Interval:</Text>
            <Text style={styles.value}>
              {goal.customDepositIntervalDays} days
            </Text>
          </View>
        )}

        {goal.description && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{goal.description}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("EditGoal", { goalId: goal.savingsGoalId })
          }
        >
          <Text style={styles.editButtonText}>Edit Goal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: "#000",
  },
  editButton: {
    backgroundColor: "#2F3039",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SavingsGoalDetails;
