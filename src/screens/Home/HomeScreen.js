import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import { useQuery } from "@tanstack/react-query";
import { getAllSavingsGoals, getSavingsTrend } from "../../api/savingsGoal";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { getProfile } from "../../api/user";
import Modal from "react-native-modal";
import GrowMesh from "../../components/GrowMesh";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import { deleteToken } from "../../api/storage";
import { useTheme } from "../../context/ThemeContext";

const lightStyles = StyleSheet.create({
  speechBubble: {
    position: "absolute",
    bottom: 45,
    right: 65,
    backgroundColor: "rgba(0, 0, 0, 0.44)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: 230,
    zIndex: 10,
    borderBottomRightRadius: 10,
  },
  speechBubbleText: {
    color: "#FFF",
    fontSize: 13,
    lineHeight: 20,
  },
  modalContent: {
    padding: 10,
    borderRadius: 10,
    height: "80%",
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  absoluteImage: {
    width: 80,
    height: 80,
  },
  absoluteImage2: {
    position: "absolute",
    bottom: 80,
    right: 0,
    width: "100%",
    alignItems: "flex-end",
  },
  box2: {
    width: 287,
    height: 1,
    backgroundColor: "#00000057",
    marginBottom: 13,
    marginLeft: 71,
  },
  dropdownContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 30,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30,30,30,0.09)",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 14,
    height: 30,
  },
  dropdownButtonText: {
    color: "black",
    fontSize: 16,
    marginRight: 5,
  },
  dropdownMenu: {
    position: "absolute",
    top: 35,
    zIndex: 1000,
    paddingVertical: 5,
    alignSelf: "center",
    gap: 9,
  },
  dropdownItem: {
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 19,
    height: 30,
  },
  dropdownItemText: {
    color: "black",
    fontSize: 16,
    marginRight: 5,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 200,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: -40,
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
    color: "rgba(13, 46, 96, 0.6)",
    fontSize: 12,
    marginTop: 5,
  },
  differenceText: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: "bold",
    color: "black", // Default color, overridden dynamically
  },
  placeholderContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  image2: {
    width: 34,
    height: 41,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    marginTop: 8,
    marginBottom: 9,
    marginHorizontal: 16,
    position: "absolute",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 10,
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
  text: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 11,
    marginHorizontal: 16,
    marginTop: 40,
  },
  text2: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 11,
    marginHorizontal: 16,
  },
  text6: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 13,
    marginLeft: 16,
    marginTop: 20,
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
  emoji: {
    fontSize: 40,
    justifyContent: "center",
    alignItems: "center",
    right: 10,
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
  info: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 15,
    width: "49%",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    height: 80,
  },
  notificationWrapper: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: -3,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  textIcons: {
    color: "black",
  },
});

const darkStyles = StyleSheet.create({
  speechBubble: {
    position: "absolute",
    bottom: 45,
    right: 65,
    backgroundColor: "rgba(255, 255, 255, 0.44)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: 230,
    zIndex: 10,
    borderBottomRightRadius: 10,
  },
  speechBubbleText: {
    color: "#FFF",
    fontSize: 13,
    lineHeight: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#292848",
  },
  modalContent: {
    padding: 10,
    borderRadius: 10,
    height: "80%",
    flex: 1,
    backgroundColor: "#292848",
  },
  absoluteImage: {
    width: 80,
    height: 80,
  },
  absoluteImage2: {
    position: "absolute",
    bottom: 80,
    right: 0,
    width: "100%",
    alignItems: "flex-end",
  },
  box2: {
    width: 287,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 13,
    marginLeft: 71,
  },
  dropdownContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 30,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 14,
    height: 30,
  },
  dropdownButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 5,
  },
  dropdownMenu: {
    position: "absolute",
    top: 35,
    zIndex: 1000,
    paddingVertical: 5,
    alignSelf: "center",
    gap: 9,
  },
  dropdownItem: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 19,
    height: 30,
  },
  dropdownItemText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 5,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 200,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: -40,
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
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    marginTop: 5,
  },
  differenceText: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  placeholderContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  column2: {
    marginBottom: 133,
    marginHorizontal: 16,
  },
  column3: {
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    borderRadius: 14,
    paddingVertical: 23,
  },
  column4: {
    flex: 1,
  },
  image: {
    width: 41,
    height: 41,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  image2: {
    width: 34,
    height: 41,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    marginTop: 8,
    marginBottom: 9,
    marginHorizontal: 16,
    position: "absolute",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 10,
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
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 11,
    marginHorizontal: 16,
    marginTop: 40,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 11,
    marginHorizontal: 16,
  },
  text6: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 13,
    marginLeft: 16,
    marginTop: 20,
  },
  text7: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginRight: 4,
    flex: 1,
  },
  text8: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "right",
    flex: 1,
  },
  text10: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
  seeAll: {
    alignItems: "center",
    alignSelf: "center",
  },
  emoji: {
    fontSize: 40,
    justifyContent: "center",
    alignItems: "center",
    right: 10,
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
    color: "#FFFFFF",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  info: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 15,
    width: "49%",
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    height: 80,
  },
  notificationWrapper: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: -3,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  textIcons: {
    color: "white",
  },
});

const AnimatedBar = ({ value, label, maxValue, difference, styles, theme }) => {
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
    difference > 0 ? "#1f77b4" : difference < 0 ? "#ff7f0e" : "#d9d9d9";

  return (
    <View style={styles.barContainer}>
      {difference !== null && difference !== 0 && (
        <Text
          style={[
            styles.differenceText,
            {
              color:
                difference > 0
                  ? theme === "light"
                    ? "green"
                    : "lightgreen"
                  : theme === "light"
                  ? "red"
                  : "pink",
            },
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

const BarChartComponent = ({ data, styles, theme }) => {
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
          styles={styles}
          theme={theme}
        />
      ))}
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { setIsAuth } = useContext(UserContext);
  const styles = theme === "light" ? lightStyles : darkStyles;
  const iconColor = theme === "light" ? "black" : "white";

  console.log("HomeScreen rendered with theme:", theme);
  console.log("Styles applied to box2:", styles.box2);

  const [isModalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);

  const systemPrompt =
    "Your name is GrowMesh. You are a friendly financial assistant for the home screen of a savings goals app. You have access to all savings goals and savings trend data. Provide short, conversational answers in a single sentence about overall savings, trends, or the first two goals when the user's message is related to their savings. Always include the 'KWD' currency for monetary values and format responses like 'Your total savings across all goals are KWD X.' If the user greets you (e.g., 'hi'), respond with a friendly greeting like 'Hey!' or 'Hi there!' If the user expresses gratitude (e.g., 'thank you'), simply respond with 'You're welcome!' or a similar acknowledgment. If the user says goodbye (e.g., 'goodbye'), respond with 'Goodbye! Let me know if you need help with your savings later.' For messages that are not related to savings goals, greetings, or gratitude, respond with a polite but firm redirection like 'I only assist with savings plans and goals, but let’s focus on your savings progress!' or 'I don’t handle that—I’m here to help with your savings goals!' If no goals or trend data are available, respond with 'You have no savings goals yet. Want to create one?' If the user mentions a savings goal amount and a deadline (e.g., 'I need to save 1000 KWD by September'), calculate a monthly savings plan based on the current date and the deadline, and suggest a plan like 'You have X months to save 1000 KWD, so I recommend saving KWD Y per month.' Do not give lengthy answers.";

  const [filter, setFilter] = useState("days");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const bubbleOpacity = useSharedValue(0);

  const bubbleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: bubbleOpacity.value,
    };
  });

  useEffect(() => {
    console.log("Theme changed to:", theme);
  }, [theme]);

  useEffect(() => {
    bubbleOpacity.value = withTiming(1, { duration: 500 });

    const timeout = setTimeout(() => {
      bubbleOpacity.value = withTiming(0, { duration: 500 }, () => {
        runOnJS(setIsBubbleVisible)(false);
      });
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const filterOptions = ["days", "months", "years"];
  const displayedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);

  const {
    data: goalsData,
    isLoading: goalsLoading,
    isError: goalsError,
    error: goalsErrorDetails,
  } = useQuery({
    queryKey: ["fetchAllSavingsGoals"],
    queryFn: () => getAllSavingsGoals(),
    refetchOnMount: "always",
  });

  const periodTypeMap = {
    days: "day",
    months: "month",
    years: "year",
  };
  const periodType = periodTypeMap[filter] || "day";

  const {
    data: trendData,
    isLoading: trendLoading,
    isError: trendError,
    error: trendErrorDetails,
  } = useQuery({
    queryKey: ["fetchSavingsTrend", filter],
    queryFn: () => getSavingsTrend(periodType),
  });

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileErrorDetails,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    console.log("\ngoals data:\n", goalsData);
    console.log("\ntrend data:\n", trendData);
    console.log("\nProfile data:\n", profileData);
    if (goalsError) {
      console.log("\ngoals error\n", goalsErrorDetails);
    } else if (trendError) {
      console.log("\ntrend error:\n", trendErrorDetails);
    } else if (profileError) {
      console.log("\nprofile error\n", profileErrorDetails);
    }
  }, [goalsData, trendData, profileData]);

  useEffect(() => {
    console.log("HomeScreen mounted at:", new Date().toISOString());
  }, []);

  const handleLogout = async () => {
    try {
      await deleteToken();
      setIsAuth(false);
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  if (goalsLoading || trendLoading || profileLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            padding: 10,
            borderRadius: 50,
            backgroundColor: "rgba(255, 0, 0, 0.08)",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
          }}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="red" />
        </TouchableOpacity>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (goalsError || trendError || profileError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            padding: 10,
            borderRadius: 50,
            backgroundColor: "rgba(255, 0, 0, 0.08)",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
          }}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="red" />
        </TouchableOpacity>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {goalsError
              ? `Error fetching goals: ${
                  goalsErrorDetails?.message || "Unknown error"
                }`
              : trendError
              ? `Error fetching trend: ${
                  trendErrorDetails?.message || "Unknown error"
                }`
              : profileError
              ? `Error fetching profile: ${
                  profileErrorDetails?.message || "Unknown error"
                }`
              : "Error fetching data"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const Goals = goalsData.filter((goal) => goal.status === "inProgress") || [];
  const totalSavings = goalsData.reduce(
    (sum, goal) => sum + goal.currentAmount,
    0
  );
  const inProgressGoalsCount = Goals.filter(
    (goal) => goal.status === "inProgress"
  ).length;
  const completedGoalsCount = Goals.filter(
    (goal) => goal.status === "Completed"
  ).length;

  const chartData = (trendData || []).map((item) => {
    const date = new Date(item.periodEnd);
    let label;
    switch (filter) {
      case "days":
        label = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        break;
      case "months":
        label = date.toLocaleDateString("en-US", { month: "short" });
        break;
      case "years":
        label = date.getFullYear().toString().slice(-2);
        break;
      default:
        label = "";
    }
    return {
      label,
      value: item.totalSavings,
      difference: item.difference,
    };
  });

  const allZeros =
    chartData.length === 0 || chartData.every((item) => item.value === 0);
  console.log("\nallZeros:\n", allZeros);

  const notificationCount = goalsData.filter(
    (goal) => goal.status === "markDone"
  ).length;

  const handleError = (error) => {
    console.error("Chat error:", error.message);
    Alert.alert(
      "Error",
      "Failed to get a response from the chatbot. Please try again."
    );
  };

  const contextData = {
    all_goals_data: goalsData || [],
  };

  const handleOpenModal = () => {
    console.log(
      "Opening GrowMesh modal from HomeScreen at:",
      new Date().toISOString()
    );
    setModalVisible(true);
  };

  const handleClose = () => {
    console.log(
      "Closing GrowMesh modal from HomeScreen at:",
      new Date().toISOString()
    );
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.image}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            {profileData.profilePicture ? (
              <Image
                source={{
                  uri: profileData.profilePicture,
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <FontAwesome name="user-circle-o" size={40} color={iconColor} />
            )}
          </TouchableOpacity>

          <View>
            <View style={styles.notificationWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
              >
                <Ionicons
                  name="notifications-outline"
                  size={34}
                  color={iconColor}
                />
                {notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <LottieView
                      source={require("../../../assets/app/red.json")}
                      autoPlay
                      loop
                      width={50}
                      height={50}
                      style={{
                        position: "absolute",
                      }}
                    />
                    <Text style={styles.notificationBadgeText}>
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.text}>{"Total saving"}</Text>
        <Text style={styles.text2}>{`KWD ${totalSavings}`}</Text>
        <View style={styles.view}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              <Text style={styles.dropdownButtonText}>{displayedFilter}</Text>
              <MaterialIcons
                name={isDropdownVisible ? "arrow-drop-up" : "arrow-drop-down"}
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>
            {isDropdownVisible && (
              <View style={styles.dropdownMenu}>
                {filterOptions
                  .filter((option) => option !== filter)
                  .map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setFilter(option);
                        setIsDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        </View>
        {allZeros ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Start saving to see your progress!
            </Text>
          </View>
        ) : (
          <BarChartComponent data={chartData} styles={styles} theme={theme} />
        )}
        <Text style={styles.text6}>{"Savings Goals"}</Text>
        <View style={styles.column2}>
          <View style={styles.column3}>
            {Goals.reverse()
              .slice(0, 2)
              .map((goal, index) => {
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
                      style={index === 2 ? styles.row4 : styles.row2}
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
                        <View style={index === 2 ? styles.row5 : styles.row3}>
                          <Text style={styles.text7}>
                            {goal.savingsGoalName}
                          </Text>
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
                    {index < 1 && <View style={styles.box2} />}
                  </React.Fragment>
                );
              })}
            <TouchableOpacity
              onPress={() => navigation.navigate("AllSavingsGoals")}
              style={styles.seeAll}
            >
              <Text style={styles.text10}>{"See All"}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              height: 90,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.info}>
              <MaterialCommunityIcons
                name="bullseye-arrow"
                size={30}
                color="#1f77b4"
              />
              <Text style={styles.textIcons}>{inProgressGoalsCount}</Text>
            </View>
            <View style={styles.info}>
              <AntDesign name="checkcircle" size={30} color="#1f77b4" />

              <Text style={styles.textIcons}>{completedGoalsCount}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* GrowMesh ============================================ */}
      <View style={styles.absoluteImage2}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Image
            source={require("../../../assets/app/growmesh-light.png")}
            resizeMode={"stretch"}
            style={styles.absoluteImage}
          />
        </TouchableOpacity>
        {isBubbleVisible && (
          <Animated.View style={[styles.speechBubble, bubbleAnimatedStyle]}>
            <Text style={styles.speechBubbleText}>
              Hi, I'm GrowMesh!{`\n`}I can help you manage your savings goals.
            </Text>
          </Animated.View>
        )}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={handleClose}
          onModalShow={() =>
            console.log("HomeScreen Modal shown at:", new Date().toISOString())
          }
        >
          <View
            style={styles.modalContent}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              console.log("HomeScreen Modal Content Layout:", {
                width,
                height,
              });
            }}
          >
            {console.log(
              "HomeScreen modalContent style applied:",
              styles.modalContent
            )}
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

export default HomeScreen;
