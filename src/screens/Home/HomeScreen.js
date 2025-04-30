// import {
//   SafeAreaView,
//   View,
//   ScrollView,
//   Image,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import * as Progress from "react-native-progress";
// import { useQuery } from "@tanstack/react-query";
// import { getAllSavingsGoals, getSavingsTrend } from "../../api/savingsGoal";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { getProfile } from "../../api/user";

// // Bar Chart Component
// const AnimatedBar = ({ value, label, maxValue, difference }) => {
//   const height = useSharedValue(0);

//   React.useEffect(() => {
//     // Ensure a minimum height even if value is 0
//     const calculatedHeight = value === 0 ? 5 : (value / maxValue) * 150;
//     height.value = withTiming(calculatedHeight, { duration: 1000 });
//   }, [value, maxValue]);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       height: height.value,
//     };
//   });

//   // Use levels of rgba(21, 254, 211) based on difference
//   const barColor =
//     difference > 0
//       ? "rgba(21, 254, 211, 1)" // Full opacity for positive
//       : difference < 0
//       ? "rgba(21, 254, 211, 0.2)" // Low opacity for negative
//       : "rgba(21, 254, 211, 0.5)"; // Medium opacity for zero

//   return (
//     <View style={styles.barContainer}>
//       {difference !== null && difference !== 0 && (
//         <Text
//           style={[
//             styles.differenceText,
//             { color: difference > 0 ? "#00FF00" : "#FF0000" },
//           ]}
//         >
//           {difference > 0 ? `+${difference.toFixed(3)}` : difference.toFixed(3)}
//         </Text>
//       )}
//       <Animated.View
//         style={[styles.bar, { backgroundColor: barColor }, animatedStyle]}
//       />
//       <Text style={styles.barLabel}>{label}</Text>
//     </View>
//   );
// };

// const BarChartComponent = ({ data }) => {
//   const maxValue = Math.max(...data.map((item) => item.value), 10) * 1.1; // Ensure minimum scale

//   return (
//     <View style={styles.chartContainer}>
//       {data.map((item, index) => (
//         <AnimatedBar
//           key={index}
//           value={item.value}
//           label={item.label}
//           maxValue={maxValue}
//           difference={item.difference}
//         />
//       ))}
//     </View>
//   );
// };

// const HomeScreen = ({ navigation }) => {
//   const [filter, setFilter] = useState("days");
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const filterOptions = ["days", "months", "years"];
//   const displayedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);

//   // Fetch savings goals
//   const {
//     data: goalsData,
//     isLoading: goalsLoading,
//     isError: goalsError,
//     error: goalsErrorDetails,
//   } = useQuery({
//     queryKey: ["fetchAllSavingsGoals"],
//     queryFn: () => getAllSavingsGoals(),
//     refetchOnMount: "always",
//   });

//   // Map plural filter values to singular for the API
//   const periodTypeMap = {
//     days: "day",
//     months: "month",
//     years: "year",
//   };
//   const periodType = periodTypeMap[filter] || "day"; // Default to "day" if filter is invalid

//   // Fetch savings trend
//   const {
//     data: trendData,
//     isLoading: trendLoading,
//     isError: trendError,
//     error: trendErrorDetails,
//   } = useQuery({
//     queryKey: ["fetchSavingsTrend", filter],
//     queryFn: () => getSavingsTrend(periodType),
//   });

//   const {
//     data: profileData,
//     isLoading: profileLoading,
//     isError: profileError,
//     error: profileErrorDetails,
//   } = useQuery({
//     queryKey: ["profile"],
//     queryFn: getProfile,
//   });

//   // Log data changes
//   useEffect(() => {
//     console.log("\ngoals data:\n", goalsData);
//     console.log("\ntrend data:\n", trendData);
//     console.log("\nProfile data:\n", profileData);
//     if (goalsError) {
//       console.log("\ngoals error\n", goalsErrorDetails);
//     } else if (trendError) {
//       console.log("\ntrend error:\n", trendErrorDetails);
//     } else if (profileError) {
//       console.log("\nprofile error\n", profileErrorDetails);
//     }
//   }, [goalsData, trendData, profileData]);

//   // Handle loading and error states
//   if (goalsLoading || trendLoading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (goalsError || trendError) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>
//             {goalsError
//               ? `Error fetching goals: ${
//                   goalsErrorDetails?.message || "Unknown error"
//                 }`
//               : trendError
//               ? `Error fetching trend: ${
//                   trendErrorDetails?.message || "Unknown error"
//                 }`
//               : "Error fetching data"}
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const Goals = goalsData || [];
//   const totalSavings = Goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
//   const inProgressGoalsCount = Goals.filter(
//     (goal) => goal.status === "inProgress"
//   ).length;
//   const completedGoalsCount = Goals.filter(
//     (goal) => goal.status === "Completed"
//   ).length;
//   // Format trend data for the chart with a fallback
//   const chartData = (trendData || []).map((item) => {
//     const date = new Date(item.periodEnd);
//     let label;
//     switch (filter) {
//       case "days":
//         label = date.toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//         }); // e.g., "Apr 13"
//         break;
//       case "months":
//         label = date.toLocaleDateString("en-US", { month: "short" }); // e.g., "Mar"
//         break;
//       case "years":
//         label = date.getFullYear().toString().slice(-2); // e.g., "24"
//         break;
//       default:
//         label = "";
//     }
//     return {
//       label,
//       value: item.totalSavings,
//       difference: item.difference,
//     };
//   });

//   // Check if all totals are 0 or if chartData is empty
//   const allZeros =
//     chartData.length === 0 || chartData.every((item) => item.value === 0);
//   console.log("\nallZeros:\n", allZeros); // Debug log

//   // Define colors for progress bars
//   const progressColors = [
//     "#36C3C6",
//     "#B536C6",
//     "#D8686A",
//     "#FFD700",
//     "#FF6347",
//     "#4682B4",
//   ];

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView style={styles.ScrollView}>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.image}
//           onPress={() => navigation.navigate("Profile")}
//         >
//                  <Ionicons name="person-circle-outline" size={40} color="black" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.image}
//           onPress={() => navigation.navigate("Profile")}
//         >
//                  <Ionicons name="notifications-outline" size={34} color="black" />
//         </TouchableOpacity>
//         {/* <Ionicons name="notifications-outline" size={40} color="black" /> */}
//       </View>
//       <Text style={styles.text}>{"Total saving"}</Text>
//       <Text style={styles.text2}>{`KWD ${totalSavings.toFixed(3)}`}</Text>
//       <View style={styles.view}>
//         <View style={styles.dropdownContainer}>
//           <TouchableOpacity
//             style={styles.dropdownButton}
//             onPress={() => setIsDropdownVisible(!isDropdownVisible)}
//           >
//             <Text style={styles.dropdownButtonText}>{displayedFilter}</Text>
//             <MaterialIcons
//               name={isDropdownVisible ? "arrow-drop-up" : "arrow-drop-down"}
//               size={20}
//               color="black"
//             />
//           </TouchableOpacity>
//           {isDropdownVisible && (
//             <View style={styles.dropdownMenu}>
//               {filterOptions
//                 .filter((option) => option !== filter)
//                 .map((option) => (
//                   <TouchableOpacity
//                     key={option}
//                     style={styles.dropdownItem}
//                     onPress={() => {
//                       setFilter(option);
//                       setIsDropdownVisible(false);
//                     }}
//                   >
//                     <Text style={styles.dropdownItemText}>
//                       {option.charAt(0).toUpperCase() + option.slice(1)}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//             </View>
//           )}
//         </View>
//       </View>
//       {allZeros ? (
//         <View style={styles.placeholderContainer}>
//           <Text style={styles.placeholderText}>
//             Start saving to see your progress!
//           </Text>
//         </View>
//       ) : (
//         <BarChartComponent data={chartData} />
//       )}
//       <Text style={styles.text6}>{"Savings Goals"}</Text>
//       <View style={styles.column2}>
//         <View style={styles.column3}>
//           {Goals.slice(0, 9).map((goal, index) => {
//             let progress = 0;
//             if (goal.lockType === "amountBased") {
//               progress =
//                 goal.targetAmount > 0
//                   ? goal.currentAmount / goal.targetAmount
//                   : 0;
//             } else if (goal.lockType === "timeBased") {
//               const startDate = new Date(goal.createdAt);
//               const endDate = new Date(goal.targetDate);
//               const currentDate = new Date();
//               const totalDuration = endDate.getTime() - startDate.getTime();
//               const elapsedDuration =
//                 currentDate.getTime() - startDate.getTime();
//               progress =
//                 totalDuration > 0 ? elapsedDuration / totalDuration : 0;
//               progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1
//             }
//             const color = progressColors[index % progressColors.length];
//             return (
//               <React.Fragment key={goal.savingsGoalId}>
//                 <TouchableOpacity
//                   style={index === 2 ? styles.row4 : styles.row2}
//                   onPress={() => {
//                     navigation.navigate("SavingsGoalDetails", {
//                       goalId: goal.savingsGoalId,
//                     });
//                   }}
//                 >
//                   {goal.emoji ? (
//                     <Text style={styles.emoji}>{goal.emoji}</Text>
//                   ) : (
//                     <MaterialCommunityIcons
//                       name="bullseye-arrow"
//                       size={40}
//                       color="rgba(21, 254, 211, 1)"
//                     />
//                   )}
//                   <View style={styles.column4}>
//                     <View style={index === 2 ? styles.row5 : styles.row3}>
//                       <Text style={styles.text7}>{goal.savingsGoalName}</Text>
//                       {goal.lockType === "amountBased" ? (
//                         <Text style={styles.text8}>
//                           {`${goal.currentAmount} / ${goal.targetAmount} KWD`}
//                         </Text>
//                       ) : (
//                         <Text style={styles.text8}>
//                           {`${new Date(
//                             goal.targetDate
//                           ).toLocaleDateString()} | ${goal.currentAmount} KWD`}
//                         </Text>
//                       )}
//                     </View>
//                     <Progress.Bar
//                       progress={progress}
//                       width={null}
//                       height={10}
//                       color={color}
//                       unfilledColor="#F0F0F0"
//                       borderWidth={2}
//                       borderRadius={8}
//                     />
//                   </View>
//                 </TouchableOpacity>
//                 {index < 1 && <View style={styles.box2} />}
//               </React.Fragment>
//             );
//           })}
//           <TouchableOpacity
//             onPress={() => navigation.navigate("AllSavingsGoals")}
//             style={styles.seeAll}
//           >
//             <Text style={styles.text10}>{"See All"}</Text>
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             marginTop: 10,
//             height: 90,
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <View style={styles.info}>
//             <MaterialCommunityIcons
//               name="bullseye-arrow"
//               size={30}
//               color="black"
//             />
//             <Text>{inProgressGoalsCount}</Text>
//           </View>
//           <View style={styles.info}>
//             <AntDesign name="checkcircle" size={30} color="black" />
//             <Text>{completedGoalsCount}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.absoluteImage2}>
//         <TouchableOpacity>
//           <Image
//             source={{
//               uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/em1sgz79_expires_30_days.png",
//             }}
//             resizeMode={"stretch"}
//             style={styles.absoluteImage}
//           />
//         </TouchableOpacity>
//       </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FEF7FF",
//   },
//   absoluteImage: {
//     width: 70,
//     height: 70,
//   },
//   absoluteImage2: {
//     position: "absolute",
//     bottom: 120,
//     right: 0,
//     width: "100%",
//     alignItems: "flex-end",
//   },
//   box2: {
//     width: 287,
//     height: 1,
//     backgroundColor: "#00000057",
//     marginBottom: 13,
//     marginLeft: 71,
//   },
//   dropdownContainer: {
//     position: "relative",
//     alignItems: "center",
//   },
//   dropdownButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(30,30,30,0.09)",
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 14,
//     height: 30,
//   },
//   dropdownButtonText: {
//     color: "black",
//     fontSize: 16,
//     marginRight: 5,
//   },
//   dropdownMenu: {
//     position: "absolute",
//     top: 35, // Adjust this value to control vertical position
//     zIndex: 1000,
//     paddingVertical: 5,
//     alignSelf: "center",
//     gap: 9,
//   },
//   dropdownItem: {
//     alignItems: "center",
//     backgroundColor: "rgba(30, 30, 30, 0.09)",
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 19,
//     height: 30,
//   },
//   dropdownItemText: {
//     color: "black",
//     fontSize: 16,
//     marginRight: 5,
//   },
//   chartContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "flex-end",
//     height: 200,
//     paddingHorizontal: 16,
//     marginBottom: 10,
//     marginTop: -40,
//   },
//   barContainer: {
//     alignItems: "center",
//     width: 40,
//   },
//   bar: {
//     width: 40,
//     borderRadius: 10,
//   },
//   barLabel: {
//     color: "#000",
//     fontSize: 12,
//     marginTop: 5,
//   },
//   differenceText: {
//     fontSize: 10,
//     marginBottom: 5,
//     fontWeight: "bold",
//   },
//   placeholderContainer: {
//     height: 200,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   placeholderText: {
//     color: "#000",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   column2: {
//     marginBottom: 133,
//     marginHorizontal: 16,
//   },
//   column3: {
//     alignItems: "flex-start",
//     backgroundColor: "rgba(30,30,30,0.09)",
//     borderRadius: 14,
//     paddingVertical: 23,
//   },
//   column4: {
//     flex: 1,
//   },
//   image: {
//     width: 41,
//     height: 41,
//   },
//   image2: {
//     width: 34,
//     height: 41,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 6,
//     marginTop: 8,
//     marginBottom: 9,
//     marginHorizontal: 16,
//   },
//   row2: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 14,
//     paddingVertical: 10,
//     paddingHorizontal: 23,
//     marginBottom: 14,
//   },
//   row3: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 9,
//   },
//   row4: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 9,
//     paddingHorizontal: 23,
//     marginBottom: 14,
//   },
//   row5: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   text: {
//     color: "#000000",
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 11,
//     marginHorizontal: 16,
//   },
//   text2: {
//     color: "#000000",
//     fontSize: 25,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 11,
//     marginHorizontal: 16,
//   },
//   text6: {
//     color: "#000000",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 13,
//     marginLeft: 16,
//     marginTop: 20,
//   },
//   text7: {
//     color: "#000000",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "left",
//     marginRight: 4,
//     flex: 1,
//   },
//   text8: {
//     color: "#000000",
//     fontSize: 16,
//     textAlign: "right",
//     flex: 1,
//   },
//   text10: {
//     color: "#000000",
//     fontSize: 16,
//     textAlign: "center",
//     alignSelf: "center",
//     fontWeight: "bold",
//   },
//   seeAll: {
//     alignItems: "center",
//     alignSelf: "center",
//   },
//   emoji: {
//     fontSize: 24,
//     marginRight: 8,
//   },
//   view: {
//     alignItems: "center",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     color: "black",
//     fontSize: 16,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "black",
//     fontSize: 16,
//   },
//   info: {
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 5,
//     borderRadius: 15,
//     width: "49%",
//     backgroundColor: "rgba(30, 30, 30, 0.09)",
//     height: 80,
//   },
// });


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
import React, { useState, useEffect, useCallback } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Progress from "react-native-progress";
import { useQuery } from "@tanstack/react-query";
import {
  getAllSavingsGoals,
  getSavingsTrend,
  homeAgent,
} from "../../api/savingsGoal";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import { getProfile } from "../../api/user";
import ChatScreen from "../../components/ChatScreen";

// Bar Chart Component
const AnimatedBar = ({ value, label, maxValue, difference }) => {
  const height = useSharedValue(0);

  React.useEffect(() => {
    // Ensure a minimum height even if value is 0
    const calculatedHeight = value === 0 ? 5 : (value / maxValue) * 150;
    height.value = withTiming(calculatedHeight, { duration: 1000 });
  }, [value, maxValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  // Use levels of rgba(21, 254, 211) based on difference
  const barColor =
    difference > 0
      ? "rgba(21, 254, 211, 1)" // Full opacity for positive
      : difference < 0
      ? "rgba(21, 254, 211, 0.2)" // Low opacity for negative
      : "rgba(21, 254, 211, 0.5)"; // Medium opacity for zero

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
  const maxValue = Math.max(...data.map((item) => item.value), 10) * 1.1; // Ensure minimum scale

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

const HomeScreen = ({ navigation }) => {
  // GrowMesh ============================================
  const [isModalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  //==>> Llama
  // const onSend = useCallback(async (newMessages = []) => {
  //   setMessages((prev) => [...newMessages, ...prev]);
  //   const userMessage = newMessages[0].text;

  //   try {
  //     const response = await homeAgent(userMessage);
  //     const botMessage = {
  //       _id: Math.random().toString(36).substring(7),
  //       text: response.Response,
  //       createdAt: new Date(),
  //       user: { _id: 2, name: "Home Agent" },
  //     };
  //     setMessages((prev) => [botMessage, ...prev]);
  //   } catch (error) {
  //     const errorMessage = {
  //       _id: Math.random().toString(36).substring(7),
  //       text: "Sorry, I encountered an error. Please try again.",
  //       createdAt: new Date(),
  //       user: { _id: 2, name: "Home Agent" },
  //     };
  //     setMessages((prev) => [errorMessage, ...prev]);
  //   }
  // }, []);

  // const handleClose = () => {
  //   setModalVisible(false);
  // };

  //==>> Grok
  const systemPrompt =
    "Your name is GrowMesh. You are a financial assistant for the home screen of a savings goals app. You have access to all savings goals and savings trend data. Provide short, concise answers in a single sentence about overall savings, trends, or the first two goals. Always include the '$' symbol for monetary values and format responses like 'Your total savings across all goals are $X.' If no goals or trend data are available, respond with 'You have no savings goals yet.' Do not give lengthy answers.";
  // ============================================ GrowMesh

  const [filter, setFilter] = useState("days");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filterOptions = ["days", "months", "years"];
  const displayedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);

  // Fetch savings goals
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

  // Map plural filter values to singular for the API
  const periodTypeMap = {
    days: "day",
    months: "month",
    years: "year",
  };
  const periodType = periodTypeMap[filter] || "day"; // Default to "day" if filter is invalid

  // Fetch savings trend
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

  // Log data changes
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

  // Handle loading and error states
  if (goalsLoading || trendLoading || profileLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (goalsError || trendError || profileError) {
    return (
      <SafeAreaView style={styles.safeArea}>
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

  const Goals = goalsData || [];
  const totalSavings = Goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const inProgressGoalsCount = Goals.filter(
    (goal) => goal.status === "inProgress"
  ).length;
  const completedGoalsCount = Goals.filter(
    (goal) => goal.status === "Completed"
  ).length;

  // Format trend data for the chart with a fallback
  const chartData = (trendData || []).map((item) => {
    const date = new Date(item.periodEnd);
    let label;
    switch (filter) {
      case "days":
        label = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }); // e.g., "Apr 13"
        break;
      case "months":
        label = date.toLocaleDateString("en-US", { month: "short" }); // e.g., "Mar"
        break;
      case "years":
        label = date.getFullYear().toString().slice(-2); // e.g., "24"
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

  // Check if all totals are 0 or if chartData is empty
  const allZeros =
    chartData.length === 0 || chartData.every((item) => item.value === 0);
  console.log("\nallZeros:\n", allZeros); // Debug log

  // Define colors for progress bars
  const progressColors = [
    "#36C3C6",
    "#B536C6",
    "#D8686A",
    "#FFD700",
    "#FF6347",
    "#4682B4",
  ];

  // GrowMesh ============================================
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

  const handleClose = () => {
    setModalVisible(false);
  };
  // ============================================ GrowMesh

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.image}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={{ uri: profilePictureUrl }}
              style={styles.profileImage}
              resizeMode="cover"
              onError={(e) => console.log("Profile image load error:", e.nativeEvent.error)}
              onLoad={() => console.log("Profile image loaded successfully")}
            />
            {profilePictureUrl === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s" && (
              <Text style={{ position: "absolute", color: "red", fontSize: 10 }}>
                Using Fallback Image
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.image}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="notifications-outline" size={34} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{"Total saving"}</Text>
        <Text style={styles.text2}>{`KWD ${totalSavings.toFixed(3)}`}</Text>
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
                color="black"
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
          <BarChartComponent data={chartData} />
        )}
        <Text style={styles.text6}>{"Savings Goals"}</Text>
        <View style={styles.column2}>
          <View style={styles.column3}>
            {Goals.slice(0, 9).map((goal, index) => {
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
                progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1
              }
              const color = progressColors[index % progressColors.length];
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
                        color="rgba(21, 254, 211, 1)"
                      />
                    )}
                    <View style={styles.column4}>
                      <View style={index === 2 ? styles.row5 : styles.row3}>
                        <Text style={styles.text7}>{goal.savingsGoalName}</Text>
                        {goal.lockType === "amountBased" ? (
                          <Text style={styles.text8}>
                            {`${goal.currentAmount} / ${goal.targetAmount} KWD`}
                          </Text>
                        ) : (
                          <Text style={styles.text8}>
                            {`${new Date(
                              goal.targetDate
                            ).toLocaleDateString()} | ${goal.currentAmount} KWD`}
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
                color="black"
              />
              <Text>{inProgressGoalsCount}</Text>
            </View>
            <View style={styles.info}>
              <AntDesign name="checkcircle" size={30} color="black" />
              <Text>{completedGoalsCount}</Text>
            </View>
          </View>
        </View>

      <View style={styles.absoluteImage2}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/em1sgz79_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.absoluteImage}
          />
        </TouchableOpacity>
        {/* GrowMesh ============================================ */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {/* //==>> Llama */}
            {/* <ChatScreen
              messages={messages}
              onSend={onSend}
              onClose={handleClose}
            /> */}

            {/* //==>> Grok */}
            <ChatScreen
              messages={messages}
              setMessages={setMessages}
              onClose={handleClose}
              systemPrompt={systemPrompt}
              contextData={contextData}
              onError={handleError}
            />
          </View>
        </Modal>
        {/* ============================================ GrowMesh */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
    width: 70,
    height: 70,
  },
  absoluteImage2: {
    position: "absolute",
    bottom: 120,
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
    color: "#000",
    fontSize: 12,
    marginTop: 5,
  },
  differenceText: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: "bold",
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
  info: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 15,
    width: "49%",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    height: 80,
  },
});