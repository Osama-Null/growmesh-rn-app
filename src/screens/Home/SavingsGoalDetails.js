import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TransferModal from "../../components/SavingsGoalDetails/TransferModal";
import Ionicons from "@expo/vector-icons/Ionicons";

// Mock API function (replace with actual API call)
const getSavingsGoalDetails = async (goalId) => {
  return {
    savingsGoalId: goalId,
    savingsGoalName: "KIDS",
    goalType: "AmountBased",
    currentAmount: 24,
    targetAmount: 25,
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-06-30T23:59:59Z",
    transactions: [
      { date: "2025-01-01T10:00:00Z", amount: 5, type: "deposit" },
      { date: "2025-02-01T10:00:00Z", amount: 5, type: "deposit" },
      { date: "2025-03-01T10:00:00Z", amount: 5, type: "deposit" },
      { date: "2025-04-01T10:00:00Z", amount: 5, type: "deposit" },
      { date: "2025-04-10T10:00:00Z", amount: 4, type: "deposit" },
    ],
  };
};

// Animated Donut Component
const AnimatedDonut = ({ progress, size, thickness, color }) => {
  const circumference = (size - thickness) * Math.PI;
  const strokeDashoffset = useSharedValue(circumference);

  useEffect(() => {
    const dashoffset = circumference * (1 - progress);
    strokeDashoffset.value = withTiming(dashoffset, { duration: 1000 });
  }, [progress, circumference]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
    };
  });

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

  React.useEffect(() => {
    const calculatedHeight = value === 0 ? 5 : (value / maxValue) * 150;
    height.value = withTiming(calculatedHeight, { duration: 1000 });
  }, [value, maxValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const barColor =
    difference > 0
      ? "rgba(21, 254, 211, 1)"
      : difference < 0
      ? "rgba(21, 254, 211, 0.2)"
      : "rgba(21, 254, 211, 0.5)";

  return (
    <View style={styles.barContainer}>
      {difference !== null && difference !== 0 && (
        <Text
          style={[
            styles.differenceText,
            { color: difference > 0 ? "#00FF00" : "#FF0000" },
          ]}
        >
          {difference > 0 ? `+${difference.toFixed(3)}` : difference.toFixed(3)}
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
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return (
          <View key={index} style={styles.transactionItem}>
            <Text style={styles.transactionText}>{formattedDate}</Text>
            <Text style={styles.transactionText}>
              {transaction.type === "deposit" ? "+" : "-"}KWD{" "}
              {transaction.amount.toFixed(3)}
            </Text>
            <Text style={styles.transactionText}>{transaction.type}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const SavingsGoalDetails = ({ navigation, route }) => {
  const { goalId } = route.params;
  const [isVisible, setIsVisible] = useState(false);

  // State for toggling between General and History views
  const [activeTab, setActiveTab] = useState("General");

  // State for TransferModal
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState("deposit");

  // State for Unlock confirmation pop-up
  const [unlockPopupVisible, setUnlockPopupVisible] = useState(false);

  // Fetch goal details
  const {
    data: goalData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchSavingsGoalDetails", goalId],
    queryFn: () => getSavingsGoalDetails(goalId),
    refetchOnMount: "always",
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {`Error fetching goal: ${error?.message || "Unknown error"}`}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const goal = goalData || {};

  // Calculate progress and format label based on goal type
  let progress = 0;
  let percentage = 0;
  let progressLabel = "";

  if (goal.goalType === "AmountBased") {
    progress =
      goal.targetAmount > 0 ? goal.currentAmount / goal.targetAmount : 0;
    percentage = Math.round(progress * 100);
    progressLabel = `KWD ${goal.currentAmount.toFixed(3)} / ${
      goal.targetAmount
    }`;
  } else if (goal.goalType === "TimeBased") {
    const startDate = new Date(goal.startDate);
    const endDate = new Date(goal.endDate);
    const currentDate = new Date("2025-04-19T00:00:00Z");
    const totalDuration = endDate - startDate;
    const elapsedDuration = currentDate - startDate;
    progress = totalDuration > 0 ? elapsedDuration / totalDuration : 0;
    progress = Math.min(Math.max(progress, 0), 1);
    percentage = Math.round(progress * 100);
    const daysRemaining = Math.max(
      0,
      Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24))
    );
    progressLabel = `${daysRemaining} days remaining`;
  }

  // Prepare chart data from transactions
  const transactions = goal.transactions || [];
  const chartData = [];
  if (transactions.length > 0) {
    const groupedByMonth = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthKey = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (!acc[monthKey]) {
        acc[monthKey] = { total: 0, transactions: [] };
      }
      const amount =
        transaction.type === "deposit"
          ? transaction.amount
          : -transaction.amount;
      acc[monthKey].total += amount;
      acc[monthKey].transactions.push(transaction);
      return acc;
    }, {});

    const months = Object.keys(groupedByMonth).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    let runningTotal = 0;
    months.forEach((month, index) => {
      runningTotal += groupedByMonth[month].total;
      const difference =
        index > 0 ? runningTotal - chartData[index - 1].value : 0;
      chartData.push({
        label: month.split(" ")[0],
        value: runningTotal,
        difference: difference,
      });
    });
  }

  // Handlers for button actions
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

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleTransferPress = () => {
    console.log("Transfer pressed, setting modalVisible to true");
    setModalVisible(true);
  };
  return (
    <View style={styles.safeArea}>
      {isVisible && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(30, 30, 30, 0.32)",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <View
            style={{
              width: "60%",
              gap: 20,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 15,
              padding: 10,
            }}
          >
            <Text>Are you sure you want to unlock this goal?</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: "rgba(30, 30, 30, 0.31)",
                  width: "45%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={toggleVisibility}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alert("Goal Unlocked")}
                style={{
                  borderRadius: 10,
                  backgroundColor: "red",
                  width: "45%",
                  height: "40",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Unlock</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/aaquihr0_expires_30_days.png",
          }}
          resizeMode={"stretch"}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.column}>
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.buttonRow}
            onPress={() => alert("Pressed!")}
          >
            <Text style={styles.text}>{goal.savingsGoalName}</Text>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/7iaoctvb_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image2}
            />
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
                color="#00F8BE"
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
                  No transaction data available.
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 60,
                marginHorizontal: 16,
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: -30,
              }}
            >
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  setActionType("withdraw");
                  setModalVisible(true);
                }}
              >
                <Image
                  source={require("../../../assets/app/depositDark.png")}
                  style={styles.img}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icon}
                onPress={handleTransferPress}
              >
                <Image
                  source={require("../../../assets/app/withdrawDark.png")}
                  style={styles.img}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.icon} onPress={handleEdit}>
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.icon} onPress={toggleVisibility}>
                <FontAwesome name="unlock-alt" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </View>

      <TransferModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(amount) => {
          console.log("Transfer amount:", amount, "Action type:", actionType);
          // Handle the transfer here
          setModalVisible(false);
        }}
        actionType={actionType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#FEF7FF", // Match the app's background or use a distinct color
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300, // Ensure the modal has enough height to be visible
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10, // Make the close button easier to tap
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FEF7FF",
    gap: 68,
    paddingTop: 90,
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
    color: "#00F8BE",
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
    color: "#00F8BE",
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
    marginTop: -60,
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
    color: "#000",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "black",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "black",
    fontSize: 16,
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
  img: {
    height: 30,
    width: 30,
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
  unlock: {
    position: "absolute",
    top: 400,
  },
});

export default SavingsGoalDetails;