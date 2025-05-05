import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllSavingsGoals } from "../../api/savingsGoal";
import * as Progress from "react-native-progress";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const AllSavingsGoals = () => {
  const navigation = useNavigation();

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

  const goals = goalsData || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1D1B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Savings Goals</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.goalsContainer}>
          <View style={styles.column3}>
            {goals.map((goal, index) => {
              let progress = 0;
              if (goal.lockType === "amountBased") {
                progress =
                  goal.targetAmount > 0
                    ? goal.currentAmount / goal.targetAmount
                    : 0;
              } else if (goal.lockType === "timeBased") {
                const startDate = new Date(goal.createdAt);
                const endDate = new Date(goal.targetDate);
                const currentDate = new Date();
                const totalDuration = endDate.getTime() - startDate.getTime();
                const elapsedDuration =
                  currentDate.getTime() - startDate.getTime();
                progress =
                  totalDuration > 0 ? elapsedDuration / totalDuration : 0;
                progress = Math.min(Math.max(progress, 0), 1);
              }
              const progressColor = goal.color || "#093565";
              return (
                <React.Fragment key={goal.savingsGoalId}>
                  <TouchableOpacity
                    style={styles.row2}
                    onPress={() => {
                      navigation.navigate("SavingsGoalDetails", {
                        goalId: goal.savingsGoalId,
                      });
                    }}
                  >
                    {goal.emoji ? (
                      <Text style={styles.emoji}>{goal.emoji}</Text>
                    ) : (
                      <MaterialCommunityIcons
                        name="bullseye-arrow"
                        size={40}
                        color="rgba(9, 53, 101, 1)"
                        style={{
                          right: 10,
                          top: 5,
                        }}
                      />
                    )}
                    <View style={styles.column4}>
                      <View style={styles.row3}>
                        <Text style={styles.text7}>{goal.savingsGoalName}</Text>
                        {goal.lockType === "amountBased" ? (
                          <Text style={styles.text8}>
                            {`${goal.currentAmount} / ${goal.targetAmount} KWD`}
                          </Text>
                        ) : (
                          <Text style={styles.text8}>
                            {`${new Date(
                              goal.targetDate
                            ).toLocaleDateString()} | ${
                              goal.currentAmount
                            } KWD`}
                          </Text>
                        )}
                      </View>
                      <Progress.Bar
                        progress={progress}
                        width={null}
                        height={10}
                        color={progressColor}
                        unfilledColor="#F0F0F0"
                        borderWidth={2}
                        borderRadius={8}
                        borderColor={progressColor}
                      />
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllSavingsGoals;

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
    position: "absolute",
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  headerRight: {
    width: 24,
  },
  scrollView: {
    flex: 1,
    marginTop: 40,
  },
  goalsContainer: {
    padding: 16,
  },
  column3: {
    alignItems: "flex-start",
    borderRadius: 14,
    paddingVertical: 23,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 23,
    marginBottom: 14,
    backgroundColor: "rgba(30,30,30,0.09)",
  },
  column4: {
    flex: 1,
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },
  text7: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginRight: 4,
    flex: 1,
  },
  text8: {
    color: "#000000",
    fontSize: 16,
    textAlign: "right",
    flex: 1,
  },
  emoji: {
    fontSize: 40,
    justifyContent: "center",
    alignItems: "center",
    right: 10,
  },
  box2: {
    width: 287,
    height: 1,
    backgroundColor: "#00000057",
    marginBottom: 13,
    marginLeft: 71,
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
  },
  errorText: {
    color: "#FF0000",
    fontSize: 16,
  },
});
