import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TransferModal from "../../components/SavingsGoalDetails/TransferModal";
import { getSavingsGoal, getSavingsGoalTrend } from "../../api/savingsGoal";
import { getTransactionsBySavingsGoal } from "../../api/transaction";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Animated Donut Component
const AnimatedDonut = ({ progress, size, thickness, color }) => {
  console.log("AnimatedDonut received progress:", progress);
  const circumference = (size - thickness) * Math.PI;
  const strokeDashoffset = useSharedValue(circumference);

  useEffect(() => {
    const dashoffset = circumference * (1 - progress);
    strokeDashoffset.value = withTiming(dashoffset, { duration: 1000 });
  }, [progress, circumference]);

  const animatedStyle = useAnimatedStyle(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={(size - thickness) / 2}
        stroke="rgba(120, 120, 128, 0.12)"
        strokeWidth={thickness}
        fill="none"
      />
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={(size - thickness) / 2}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        strokeLinecap="round"
        style={[animatedStyle]}
      />
    </Svg>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Bar Chart Component
const AnimatedBar = ({ value, label, maxValue, difference }) => {
  const height = useSharedValue(0);

  useEffect(() => {
    const calculatedHeight = value === 0 ? 5 : (value / maxValue) * 150;
    height.value = withTiming(calculatedHeight, { duration: 1000 });
  }, [value, maxValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const barColor =
    difference > 0
      ? "rgba(9, 53, 101, 0.14)" // Full opacity for positive
      : difference < 0
      ? "rgba(9, 53, 101, 0.14)" // Low opacity for negative
      : "rgba(9, 53, 101, 0.36)"; // Medium opacity for zero

  return (
    <View style={styles.barContainer}>
      {difference !== null && difference !== 0 && (
        <Text
          style={[
            styles.differenceText,
            { color: difference > 0 ? "#rgba(9, 53, 101, 0.79)" : "#FF0000" },
          ]}
        >
          {difference > 0 ? `+${difference}` : difference}
        </Text>
      )}
      <Animated.View
        style={[styles.bar, { backgroundColor: barColor }, animatedStyle]}
      />
      <Text style={styles.barLabel}>{label}</Text>
    </View>
  );
};

const BarChartComponent = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.value), 10) * 1.1;

  return (
    <View style={styles.chartContainer}>
      {data.map((item, index) => (
        <AnimatedBar
          key={index}
          value={item.value}
          label={item.label}
          maxValue={maxValue}
          difference={item.difference}
        />
      ))}
    </View>
  );
};

// Transaction List Component
const TransactionList = ({ transactions }) => {
  return (
    <ScrollView style={styles.transactionList}>
      {transactions.map((transaction, index) => {
        const date = new Date(transaction.transactionDate);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return (
          <View
            key={transaction.transactionId || index}
            style={styles.transactionItem}
          >
            <Text style={styles.transactionText}>{formattedDate}</Text>
            <Text style={styles.transactionText}>
              {transaction.transactionType === "deposit" ? "+" : "-"} KWD{" "}
              {transaction.amount}
            </Text>
            <Text style={styles.transactionText}>
              {transaction.transactionType}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const SavingsGoalDetails = ({ navigation, route }) => {
  const { goalId } = route.params;

  const [activeTab, setActiveTab] = useState("General");
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState("deposit");
  const [unlockPopupVisible, setUnlockPopupVisible] = useState(false);

  // Fetch goal details
  const {
    data: goalData,
    isLoading: goalLoading,
    isError: goalError,
    error: goalErrorDetails,
  } = useQuery({
    queryKey: ["fetchSavingsGoalDetails", goalId],
    queryFn: () => getSavingsGoal(goalId),
    refetchOnMount: "always",
  });

  // Fetch transactions
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    isError: transactionsError,
    error: transactionsErrorDetails,
  } = useQuery({
    queryKey: ["fetchTransactionsBySavingsGoal", goalId],
    queryFn: () => getTransactionsBySavingsGoal(goalId),
    refetchOnMount: "always",
  });

  // Fetch trend data (7 bars)
  const {
    data: trendResponse,
    isLoading: trendLoading,
    isError: trendError,
    error: trendErrorDetails,
  } = useQuery({
    queryKey: ["fetchSavingsGoalTrend", goalId],
    queryFn: () => getSavingsGoalTrend(goalId, 7),
    refetchOnMount: "always",
  });

  if (goalLoading || transactionsLoading || trendLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (goalError || transactionsError || trendError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>
          {goalError
            ? `Error fetching goal: ${goalErrorDetails?.message}`
            : transactionsError
            ? `Error fetching transactions: ${transactionsErrorDetails?.message}`
            : `Error fetching trend: ${trendErrorDetails?.message}`}
        </Text>
      </SafeAreaView>
    );
  }
{console.log("\nSingle goals: ", goalData, "\n");
}
  const goal = goalData || {};
  const transactions = transactionsData || [];
  const trendData = trendResponse?.trendData || [];
  const periodType = trendResponse?.periodType || "day";

  // Calculate progress
  let progress = 0;
  let percentage = 0;
  let progressLabel = "";

  if (goal.lockType === "amountBased") {
    progress =
      goal.targetAmount > 0 ? goal.currentAmount / goal.targetAmount : 0;
    percentage = Math.round(progress * 100);
    progressLabel = `KWD ${goal.currentAmount} / ${goal.targetAmount}`;
  } else if (goal.lockType === "timeBased") {
    const createdAtTrimmed = goal.createdAt.replace(/(\.\d{3})\d*/, "$1");
    const startDate = new Date(createdAtTrimmed + "Z");
    const endDate = new Date(goal.targetDate + "Z");
    const currentDate = new Date();

    // Log all dates as UTC
    console.log("startDate:", startDate.toISOString());
    console.log("endDate:", endDate.toISOString());
    console.log("currentDate:", currentDate.toISOString());

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();

    console.log("totalDuration (ms):", totalDuration);
    console.log("elapsedDuration (ms):", elapsedDuration);

    progress = totalDuration > 0 ? elapsedDuration / totalDuration : 0;
    console.log("progress before clamp:", progress);

    progress = Math.min(Math.max(progress, 0), 1);
    console.log("progress after clamp:", progress);

    percentage = Math.round(progress * 100);
    console.log("percentage:", percentage);

    const daysRemaining = Math.max(
      0,
      Math.ceil(
        (endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
    progressLabel = `KWD ${goal.currentAmount} | ${daysRemaining}d left`;

    // Pass progress to AnimatedDonut and log it
    console.log("progress sent to donut:", progress);
  } else {
    console.error(`Unexpected lockType: ${goal.lockType}`);
  }

  // Prepare chart data (7 bars)
  const chartData = trendData.map((item) => {
    const date = new Date(item.periodEnd);
    let label;
    switch (periodType) {
      case "day":
        label = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        break;
      case "week":
        label = `Week ${Math.ceil(date.getDate() / 7)}`;
        break;
      case "month":
        label = date.toLocaleDateString("en-US", { month: "short" });
        break;
      default:
        label = "";
    }
    return {
      label,
      value: item.cumulativeSavings,
      difference: item.difference,
    };
  });

  // Button handlers
  const handleDeposit = () => {
    setActionType("deposit");
    setModalVisible(true);
  };

  const handleWithdraw = () => {
    setActionType("withdraw");
    setModalVisible(true);
  };

  const handleEdit = () => {
    navigation.navigate("EditSavingsGoal", { goalId });
  };

  const handleUnlockConfirm = () => {
    alert(`Goal ID ${goalId} has been unlocked.`);
    setUnlockPopupVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {modalVisible && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0)",
            height: "100%",
            width: "100%",
            zIndex: 10,
            borderRadius: 16,
          }}
        >
          <Text style={{ opacity: 0, fontSize: 1 }}>.</Text>
        </View>
      )}

      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/aaquihr0_expires_30_days.png",
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.column}>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonRow}>
            <Text style={styles.text}>{goal.savingsGoalName}</Text>
            {goal.emoji ? (
              <Text style={styles.emoji}>{goal.emoji}</Text>
            ) : (
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/7iaoctvb_expires_30_days.png",
                }}
                style={styles.image2}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text2}>{progressLabel}</Text>
        </View>
        <View style={styles.view3}>
          <TouchableOpacity onPress={() => setActiveTab("General")}>
            <Text
              style={[
                styles.text3,
                activeTab === "General" && styles.activeTab,
              ]}
            >
              General
            </Text>
          </TouchableOpacity>
          <Text style={styles.text3}>|</Text>
          <TouchableOpacity onPress={() => setActiveTab("History")}>
            <Text
              style={[
                styles.text3,
                activeTab === "History" && styles.activeTab,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.column2}>
        {activeTab === "General" ? (
          <>
            <View style={styles.view4}>
              <AnimatedDonut
                progress={progress}
                size={245}
                thickness={23}
                color="#rgba(9, 53, 101, 0.65)"
              />
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>{`${percentage}%`}</Text>
              </View>
            </View>
            <View style={styles.view5}>
              {chartData.length > 0 ? (
                <BarChartComponent data={chartData} />
              ) : (
                <Text style={styles.placeholderText}>
                  No trend data available.
                </Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.icon} onPress={handleDeposit}>
                <MaterialCommunityIcons
                  name="arrow-up-thick"
                  size={35}
                  color="#rgb(49, 154, 46)"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={handleEdit}>
                <Feather name="edit" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={handleWithdraw}>
                <MaterialCommunityIcons
                  name="arrow-down-thick"
                  size={35}
                  color="#rgb(222, 12, 12)"
                />
              </TouchableOpacity>

              <TransferModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                goalId={goalId}
                actionType={actionType}
                style={{
                  zIndex: 1000,
                }}
              />

              <Modal
                transparent={true}
                visible={unlockPopupVisible}
                onRequestClose={() => setUnlockPopupVisible(false)}
              >
                <View style={styles.popupContainer}>
                  <View style={styles.popupContent}>
                    <Text style={styles.popupText}>
                      Are you sure you want to unlock this goal?
                    </Text>
                    <View style={styles.popupButtons}>
                      <TouchableOpacity
                        style={[styles.popupButton, styles.cancelButton]}
                        onPress={() => setUnlockPopupVisible(false)}
                      >
                        <Text style={styles.popupButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.popupButton, styles.confirmButton]}
                        onPress={handleUnlockConfirm}
                      >
                        <Text style={styles.popupButtonText}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </>
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEF7FF",
    paddingTop: 90,
    gap: 68,
  },
  back: {
    position: "absolute",
    top: 20,
    left: 15,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 48,
    paddingVertical: 4,
    paddingHorizontal: 21,
  },
  column: {
    gap: 20,
    marginHorizontal: 16,
  },
  column2: {
    marginBottom: 82,
    height: 500,
    gap: 30,
  },
  image: {
    width: 24,
    height: 24,
  },
  image2: {
    borderRadius: 48,
    width: 26,
    height: 26,
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  text: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
  },
  text2: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
  },
  text3: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  activeTab: {
    color: "#rgba(9, 53, 101, 0.65)",
    textDecorationLine: "underline",
  },
  view: {
    alignItems: "center",
  },
  view2: {
    alignItems: "center",
  },
  view3: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 15,
  },
  view4: {
    alignItems: "center",
    paddingVertical: 5,
    height: 255,
    overflow: "hidden",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  view5: {
    paddingTop: 46,
    paddingBottom: 22,
    height: 200,
    overflow: "visible",
  },
  percentageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  percentageText: {
    color: "#rgba(9, 53, 101, 0.65)",
    fontSize: 50,
    fontWeight: "900",
    shadowColor: "black",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 200,
    paddingHorizontal: 16,
    marginTop: -80,
  },
  barContainer: {
    alignItems: "center",
    width: 40,
  },
  bar: {
    width: 40,
    borderRadius: 10,
  },
  barLabel: {
    color: "#rgba(9, 53, 101, 0.93)",
    fontSize: 12,
    marginTop: 5,
  },
  differenceText: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  placeholderText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
  transactionList: {
    flex: 1,
    marginHorizontal: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#00000057",
  },
  transactionText: {
    color: "#000",
    fontSize: 14,
  },
  loadingText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    height: 60,
    marginHorizontal: 40,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -30,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "rgba(30, 30, 30, 0.1)",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    alignItems: "center",
    justifyContent: "center",
  },
  img: { height: 30, width: 30 },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    backgroundColor: "#FEF7FF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  popupText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  popupButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
  },
  confirmButton: {
    backgroundColor: "#00F8BE",
  },
  popupButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default SavingsGoalDetails;
