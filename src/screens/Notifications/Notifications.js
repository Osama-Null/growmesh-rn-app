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
  
    const progressColors = [
      "#36C3C6",
      "#B536C6",
      "#D8686A",
      "#FFD700",
      "#FF6347",
      "#4682B4",
    ];
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1D1B20" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Savings Goals</Text>
          <View style={styles.headerRight} />
        </View>
  
        <ScrollView style={styles.scrollView}>
          <View style={styles.goalsContainer}>
            {goals.map((goal, index) => {
              const progress =
                goal.targetAmount > 0
                  ? goal.currentAmount / goal.targetAmount
                  : 0;
              const color = progressColors[index % progressColors.length];
  
              return (
                <TouchableOpacity
                  key={goal.savingsGoalId}
                  style={styles.goalItem}
                  onPress={() =>
                    navigation.navigate("SavingsGoalDetails", {
                      goalId: goal.savingsGoalId,
                    })
                  }
                >
                  {goal.emoji ? (
                    <Text style={styles.emoji}>{goal.emoji}</Text>
                  ) : (
                    <MaterialCommunityIcons
                      name="bullseye-arrow"
                      size={40}
                      color="rgba(21, 254, 211, 1)"
                    />
                  )}
                  <View style={styles.goalDetails}>
                    <View style={styles.goalHeader}>
                      <Text style={styles.goalName}>{goal.savingsGoalName}</Text>
                      {goal.lockType === "amountBased" ? (
                        <Text style={styles.goalAmount}>
                          {`${goal.currentAmount} / ${goal.targetAmount} KWD`}
                        </Text>
                      ) : (
                        <Text style={styles.goalAmount}>
                          {`${new Date(goal.targetDate).toLocaleDateString()} | ${
                            goal.currentAmount
                          } KWD`}
                        </Text>
                      )}
                    </View>
                    <Progress.Bar
                      progress={progress}
                      width={null}
                      height={10}
                      color={color}
                      unfilledColor="#F0F0F0"
                      borderWidth={2}
                      borderRadius={8}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
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
      backgroundColor: "rgba(30,30,30,0.09)",
      borderRadius: 14,
      padding: 16,
      marginBottom: 16,
    },
    emoji: {
      fontSize: 24,
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
    },
    goalName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
      flex: 1,
      marginRight: 8,
    },
    goalAmount: {
      fontSize: 16,
      color: "#000",
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
  });
  