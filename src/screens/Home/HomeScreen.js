import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LineChart } from "react-native-chart-kit";
import * as Progress from "react-native-progress";
import EmojiPicker from "rn-emoji-keyboard";
import { useQuery } from "@tanstack/react-query";
import { getAllSavingsGoals } from "../../api/savingsGoal";

const HomeScreen = ({ navigation }) => {
  // API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchAllSavingsGoals"],
    queryFn: () => getAllSavingsGoals(),
    refetchOnMount: "always",
  });

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    month: "",
    amount: 0,
  });

  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth + 120;
  const chartHeight = 220;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { locationX, locationY } = evt.nativeEvent;
        const dataPoints = chartData.datasets[0].data;
        const dotSpacing = chartWidth / (dataPoints.length - 1);
        const closestDotIndex = Math.round(locationX / dotSpacing);
        if (closestDotIndex >= 0 && closestDotIndex < dataPoints.length) {
          const dotX = closestDotIndex * dotSpacing;
          const dotY =
            chartHeight - (dataPoints[closestDotIndex] / 100) * chartHeight;
          setTooltip({
            visible: true,
            x: dotX,
            y: dotY - 40, // Position above the dot
            month: chartData.labels[closestDotIndex],
            amount: dataPoints[closestDotIndex],
          });
        }
      },
      onPanResponderRelease: () => {
        setTooltip({ ...tooltip, visible: false });
      },
    })
  ).current;

  // Handle loading and error states
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
          <Text style={styles.errorText}>Error fetching goals</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Debugging logs
  if (data == null || data == undefined) {
    console.log(
      "\n︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵",
      "\n🔴 From API ❌",
      data,
      "\n︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶\n"
    );
  }
  console.log(
    "\n︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵",
    "\n🟢 From API ✔️ ",
    data,
    "\n︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶\n"
  );

  const Goals = data || [];

  // Calculate total savings
  const totalSavings = Goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  // Prepare chart data (simulated monthly contributions)
  const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const chartValues = Array(6).fill(0); // Initialize with 0 for 6 months

  // Since API doesn't provide historical data, simulate contributions
  Goals.forEach((goal) => {
    const { currentAmount, targetDate, lockType } = goal;
    if (lockType === "timeBased" && targetDate) {
      const target = new Date(targetDate);
      const now = new Date();
      const monthsDiff =
        (target.getFullYear() - now.getFullYear()) * 12 +
        (target.getMonth() - now.getMonth());
      const monthlyContribution =
        monthsDiff > 0 ? currentAmount / monthsDiff : currentAmount;
      // Distribute contribution over the last 6 months
      for (let i = 0; i < chartLabels.length; i++) {
        chartValues[i] += monthlyContribution * (i + 1); // Cumulative contribution
      }
    } else {
      // For amountBased, assume equal contribution over 6 months
      const monthlyContribution = currentAmount / 6;
      for (let i = 0; i < chartLabels.length; i++) {
        chartValues[i] += monthlyContribution * (i + 1); // Cumulative contribution
      }
    }
  });

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(21, 254, 211, 0.6)`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, 0)`, // Hide labels
    fillShadowGradientFrom: "#15FED3", // Starting color
    fillShadowGradientFromOpacity: 0.5, // Semi-transparent
    fillShadowGradientTo: "#15FED3", // Ending color
    fillShadowGradientToOpacity: 0, // Fully transparent
    propsForBackgroundLines: {
      stroke: "transparent",
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#A3CFEE",
      fill: "#A3A9EE",
    },
  };

  // Define colors for progress bars (since API doesn't provide them)
  const progressColors = [
    "#36C3C6",
    "#B536C6",
    "#D8686A",
    "#FFD700",
    "#FF6347",
    "#4682B4",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <View style={styles.image}>
            <MaterialIcons name="account-circle" size={45} color="black" />
          </View>
          {/* notification icon */}
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/7xmv6dxc_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.image2}
          />
        </View>
        <Text style={styles.text}>{"Total saving"}</Text>
        <Text style={styles.text2}>{`KWD ${totalSavings.toFixed(2)}`}</Text>
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.buttonRow}
            onPress={() => alert("Pressed!")}
          >
            <Text style={styles.text3}>{"Date"}</Text>
            <AntDesign name="down" size={15} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.chartContainer}>
          <View {...panResponder.panHandlers}>
            <LineChart
              data={chartData}
              width={chartWidth}
              height={chartHeight}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              transparent={true}
              style={{ padding: 0, margin: 0 }}
              onDataPointClick={({ value, index, x, y }) => {
                setTooltip({
                  visible: true,
                  x: x,
                  y: y - 40, // Position above the dot
                  month: chartData.labels[index],
                  amount: value,
                });
              }}
            />
            {tooltip.visible && (
              <View
                style={[
                  styles.tooltip,
                  {
                    left: tooltip.x - 50, // Center the tooltip
                    top: tooltip.y,
                  },
                ]}
              >
                <Text style={styles.tooltipText}>
                  {`${tooltip.month}: KWD ${tooltip.amount.toFixed(2)}`}
                </Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.text6}>{"Savings Goals"}</Text>
        <View style={styles.column2}>
          <View style={styles.column3}>
            {Goals.slice(0, 3).map((goal, index) => {
              const progress =
                goal.targetAmount > 0
                  ? goal.currentAmount / goal.targetAmount
                  : 0;
              const color = progressColors[index % progressColors.length];
              return (
                <React.Fragment key={goal.savingsGoalId}>
                  <TouchableOpacity
                    style={index === 2 ? styles.row4 : styles.row2}
                    onPress={() => alert(`Pressed ${goal.savingsGoalName}`)}
                  >
                    {goal.emoji ? (
                      <Text style={styles.emoji}>{goal.emoji}</Text>
                    ) : (
                      <MaterialCommunityIcons
                        name="bullseye-arrow"
                        size={40}
                        color="black"
                      />
                    )}
                    <View style={styles.column4}>
                      <View style={index === 2 ? styles.row5 : styles.row3}>
                        <Text style={styles.text7}>{goal.savingsGoalName}</Text>
                        <Text
                          style={styles.text8}
                        >{`KWD ${goal.currentAmount}`}</Text>
                      </View>
                      <Progress.Bar
                        progress={progress}
                        width={null}
                        height={8}
                        color={color}
                        unfilledColor="#F0F0F0"
                        borderWidth={0}
                        borderRadius={8}
                      />
                    </View>
                  </TouchableOpacity>
                  {index < 2 && <View style={styles.box2} />}
                </React.Fragment>
              );
            })}
            <TouchableOpacity
              onPress={() => navigation.navigate("SavingsGoalsList")}
              style={styles.seeAll}
            >
              <Text style={styles.text10}>{"See All"}</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/em1sgz79_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.absoluteImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  absoluteImage: {
    position: "absolute",
    bottom: -47,
    right: 0,
    width: 60,
    height: 60,
  },
  box2: {
    width: 287,
    height: 1,
    backgroundColor: "#00000057",
    marginBottom: 13,
    marginLeft: 71,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E3039",
    borderRadius: 39,
    paddingVertical: 4,
    paddingHorizontal: 14,
    height: 30,
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    marginHorizontal: 0,
    paddingLeft: 15,
  },
  column2: {
    marginBottom: 133,
    marginHorizontal: 16,
  },
  column3: {
    alignItems: "flex-start",
    backgroundColor: "rgba(30,30,30,0.09)",
    borderRadius: 14,
    paddingVertical: 23,
  },
  column4: {
    flex: 1,
  },
  image: {
    width: 41,
    height: 41,
  },
  image2: {
    width: 34,
    height: 41,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginTop: 8,
    marginBottom: 9,
    marginHorizontal: 16,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 23,
    marginBottom: 14,
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },
  row4: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 23,
    marginBottom: 14,
  },
  row5: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 11,
    marginHorizontal: 16,
  },
  text2: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 11,
    marginHorizontal: 16,
  },
  text3: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 13,
  },
  text6: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 13,
    marginLeft: 16,
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
  text10: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
  seeAll: {
    alignItems: "center",
    alignSelf: "center",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#2E3039",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tooltipText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  view: {
    alignItems: "center",
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
});
