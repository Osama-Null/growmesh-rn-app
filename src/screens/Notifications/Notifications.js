import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllSavingsGoals,
  markSavingsGoalAsDone,
} from "../../api/savingsGoal";
import * as Progress from "react-native-progress";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Notifications = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const {
    data: goalsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchAllSavingsGoals"],
    queryFn: getAllSavingsGoals,
    refetchOnMount: "always",
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00F8BE" />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error: {error?.message || "Failed to fetch goals"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Log the raw goals data for debugging
  console.log("Raw goals data:", JSON.stringify(goalsData, null, 2));

  // Filter goals to show only those with status "markDone"
  const markDoneGoals = (goalsData || []).filter(
    (goal) => goal.status === "markDone"
  );

  const handleMarkAsDone = async (goalId) => {
    try {
      await markSavingsGoalAsDone(goalId);
      // Refetch goals to update the list
      queryClient.invalidateQueries(["fetchAllSavingsGoals"]);
    } catch (err) {
      console.error("Failed to mark goal as done:", err);
      alert("Failed to mark goal as done. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{
          width: 44,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 17,
        }}>
          <Ionicons name="arrow-back" size={24} color="#1D1B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.goalsContainer}>
          {markDoneGoals.length === 0 ? (
            <Text style={styles.noGoalsText}>
              No savings goals are ready to be collected.
            </Text>
          ) : (
            markDoneGoals.map((goal) => {
              const progress =
                goal.targetAmount > 0
                  ? goal.currentAmount / goal.targetAmount
                  : 0;
              const color = goal.color || "#093565"; // Default color if null
              const emoji = goal.emoji || (
                <MaterialCommunityIcons
                  name="bullseye-arrow"
                  size={50}
                  color="rgba(9, 53, 101, 1)"
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 5,
                  }}
                />
              ); // Default emoji if null

              return (
                <View key={goal.savingsGoalId} style={styles.goalItem}>
                  <View style={styles.emojiContainer}>
                    <Text
                      style={{
                        fontSize: 44,
                      }}
                    >
                      {emoji}
                    </Text>
                  </View>
                  <View style={styles.goalDetails}>
                    <View style={styles.goalHeader}>
                      <Text style={styles.goalName}>
                        {goal.savingsGoalName}
                      </Text>
                    </View>
                    <View style={styles.progressContainer}>
                      <Progress.Bar
                        progress={progress}
                        width={null} // Responsive full width
                        color={color}
                        unfilledColor="#E0E0E0"
                        borderWidth={0}
                        height={8}
                      />
                    </View>
                    <View style={styles.buttonRow}>
                      <Text style={styles.progressText}>
                        {goal.targetAmount} KWD
                      </Text>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: color }]}
                        onPress={() => handleMarkAsDone(goal.savingsGoalId)}
                        accessibilityLabel={`Collect savings for ${goal.savingsGoalName}`}
                      >
                        <Text style={styles.goalAmount}>Collect</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginLeft: -24,
  },
  headerRight: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  goalsContainer: {
    padding: 16,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 30,
    padding: 16,
    marginBottom: 10,
  },
  emojiContainer: {
    marginRight: 16,
  },
  goalDetails: {
    flex: 1,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    marginRight: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  goalAmount: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
  },
  noGoalsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
