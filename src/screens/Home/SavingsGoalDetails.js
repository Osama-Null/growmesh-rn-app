import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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
import TransferModal from "../../components/TransferModal";
import { getSavingsGoal, getSavingsGoalTrend } from "../../api/savingsGoal";
import { getTransactionsBySavingsGoal } from "../../api/transaction";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GrowMesh from "../../components/GrowMesh";
import Modal from "react-native-modal";
import hexToRgba from "hex-to-rgba";
import Ionicons from "@expo/vector-icons/Ionicons";

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
const AnimatedBar = ({
  value,
  label,
  maxValue,
  difference,
  goalColor,
  maxCumulative,
}) => {
  const height = useSharedValue(0);
  {
    console.log(
      "\n===============================\nAnimatedBar color:",
      goalColor
    );
  }
  useEffect(() => {
    const calculatedHeight =
      difference === 0 ? 5 : (difference / maxValue) * 150;
    height.value = withTiming(calculatedHeight, { duration: 1000 });
  }, [difference, maxValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const opacity = maxCumulative > 0 ? value / maxCumulative : 0;
  const barColor = hexToRgba(goalColor, opacity);

  return (
    <View style={styles.barContainer}>
      {difference !== null && difference !== 0 && (
        <Text
          style={[
            styles.differenceText,
            { color: difference > 0 ? "#rgb(7, 205, 0)" : "#FF0000" },
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

const BarChartComponent = ({ data, goalColor }) => {
  {
    console.log("\n\n\nBarChartComponent color\n:", goalColor);
  }

  const maxValue = Math.max(...data.map((item) => item.difference), 10) * 1.1;
  const maxCumulative = Math.max(...data.map((item) => item.value));

  return (
    <View style={styles.chartContainer}>
      {data.map((item, index) => (
        <AnimatedBar
          key={index}
          value={item.value}
          label={item.label}
          maxValue={maxValue}
          difference={item.difference}
          goalColor={goalColor}
          maxCumulative={maxCumulative}
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

  // GrowMesh ============================================
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [messages, setMessages] = useState([]);

  const systemPrompt =
    "Your name is GrowMesh. You are a friendly financial assistant for the Savings Goal Details screen of a savings goals app. You have access to the details of a specific savings goal, including its name, target amount, current amount, lock type (amount-based or time-based), status, and transaction history. Provide short, conversational answers in a single sentence about the goal’s progress, transactions, or trends. Always include the 'KWD' currency for monetary values and format responses like 'You have saved KWD X toward your goal.' If the user asks about progress, provide details like 'You are KWD Y away from your target.' If there are no transactions, respond with 'You have no transactions for this goal yet. Want to make a deposit?' If the user mentions adjusting their savings plan, offer suggestions like 'To reach your goal faster, consider increasing your monthly deposit to KWD Z.' Do not give lengthy answers. If the user asks about something unrelated to the specific savings goal, politely redirect them with 'I’m here to help with your savings goal—what would you like to know about it?'";
  // ============================================ GrowMesh

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
  const goal = goalData || {};
  const transactions = transactionsData || [];
  const trendData = trendResponse?.trendData || [];
  const periodType = trendResponse?.periodType || "day";

  {
    console.log("==================\ntrendData:", trendData);
  }
  {
    console.log("\nperiodType:", periodType);
  }
  {
    console.log("\ngoal:", goal);
  }
  {
    console.log("\ntransactions:", transactions, "\n==================\n");
  }

  // Extract the goal color with default fallback
  const goalColor = goal.color || "#093565";

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
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
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

  // GrowMesh ============================================
  const handleError = (error) => {
    console.error("Chat error:", error.message);
    Alert.alert(
      "Error",
      "Failed to get a response from the chatbot. Please try again."
    );
  };

  const contextData = {
    goalData: goalData || [],
    transactionsData: transactionsData || [],
  };

  const handleClose = () => {
    setModalVisible2(false);
  };
  // ============================================ GrowMesh

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
        <Ionicons name="arrow-back" size={24} color="#1D1B20" />
      </TouchableOpacity>

      <View style={styles.column}>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonRow}>
            <Text style={styles.text}>{goal.savingsGoalName}</Text>
            {goal.emoji ? (
              <Text style={styles.emoji}>{goal.emoji}</Text>
            ) : (
              <MaterialCommunityIcons
                name="bullseye-arrow"
                size={30}
                color="rgba(9, 53, 101, 1)"
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
                activeTab === "General" && {
                  color: goalColor,
                  textDecorationLine: "underline",
                },
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
                activeTab === "History" && {
                  color: goalColor,
                  textDecorationLine: "underline",
                },
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
                color={goalColor}
              />
              <View style={styles.percentageContainer}>
                <Text style={[styles.percentageText, { color: goalColor }]}>
                  {`${percentage}%`}
                </Text>
              </View>
            </View>
            <View style={styles.view5}>
              {chartData.length > 0 ? (
                <BarChartComponent data={chartData} goalColor={goalColor} />
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

      {/* GrowMesh ============================================ */}
      <View style={styles.absoluteImage2}>
        <TouchableOpacity onPress={() => setModalVisible2(true)}>
          <Image
            source={require("../../../assets/app/growmesh-light.png")}
            resizeMode={"stretch"}
            style={styles.absoluteImage}
          />
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible2}
          onBackdropPress={() => setModalVisible2(false)}
        >
          <View style={styles.modalContent}>
            <GrowMesh
              messages={messages}
              setMessages={setMessages}
              onClose={handleClose}
              systemPrompt={systemPrompt}
              contextData={contextData}
              onError={handleError}
            />
          </View>
        </Modal>
      </View>
      {/* ============================================ GrowMesh */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 10,
    borderRadius: 10,
    height: "80%",
    flex: 1,
  },
  absoluteImage: {
    width: 70,
    height: 70,
  },
  absoluteImage2: {
    position: "absolute",
    bottom: 300,
    right: 0,
    width: "100%",
    alignItems: "flex-end",
  },
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
    justifyContent: "center",
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
