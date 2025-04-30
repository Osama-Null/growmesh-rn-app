import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
// import Modal from "react-native-modal";
// import { allGoalsAgent } from '../../api/savingsGoal';
// import ChatScreen from '../../components/ChatScreen';

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

  //   // GrowMesh ============================================
  //   const [isModalVisible, setModalVisible] = useState(false);
  //   const [messages, setMessages] = useState([]);

  //   //==>> Llama
  //   // const onSend = useCallback(async (newMessages = []) => {
  //   //   setMessages((prev) => [...newMessages, ...prev]);
  //   //   const userMessage = newMessages[0].text;

  //   //   try {
  //   //     const response = await allGoalsAgent(userMessage);
  //   //     const botMessage = {
  //   //       _id: Math.random().toString(36).substring(7),
  //   //       text: response.Response,
  //   //       createdAt: new Date(),
  //   //       user: { _id: 2, name: "All Goals Agent" },
  //   //     };
  //   //     setMessages((prev) => [botMessage, ...prev]);
  //   //   } catch (error) {
  //   //     const errorMessage = {
  //   //       _id: Math.random().toString(36).substring(7),
  //   //       text: "Sorry, I encountered an error. Please try again.",
  //   //       createdAt: new Date(),
  //   //       user: { _id: 2, name: "All Goals Agent" },
  //   //     };
  //   //     setMessages((prev) => [errorMessage, ...prev]);
  //   //   }
  //   // }, []);

  //   //==>> Grok
  //   const systemPrompt =
  //     "Your name is GrowMesh. You are a financial assistant for the 'All Savings Goals' screen of a savings goals app. You have access to all savings goals and their details. Provide short, concise answers in a single sentence about the goals, such as totals, statuses, or comparisons. Always include the '$' symbol for monetary values and format responses like 'Your total savings are $X.' If no goals are available, respond with 'You have no savings goals yet.' Do not give lengthy answers.";
  //   // ============================================ GrowMesh

  //    // GrowMesh ============================================
  //   const handleError = (error) => {
  //     console.error("Chat error:", error.message);
  //     Alert.alert(
  //       "Error",
  //       "Failed to get a response from the chatbot. Please try again."
  //     );
  //   };

  //   const contextData = {
  //     all_goals_data: goalsData || [],
  //   };

  //   const handleClose = () => {
  //     setModalVisible(false);
  //   };
  //   // ============================================ GrowMesh

  //   return (
  //     <View style={styles.container}>
  //       {/* Your existing content */}
  //       <TouchableOpacity
  //         onPress={() => setModalVisible(true)}
  //         style={styles.chatButton}
  //       >
  //         <Text style={styles.chatButtonText}>Chat with All Goals Agent</Text>
  //       </TouchableOpacity>
  //       {/* GrowMesh ============================================ */}
  //       <Modal
  //         isVisible={isModalVisible}
  //         onBackdropPress={() => setModalVisible(false)}
  //       >
  //         <View style={styles.modalContent}>
  //           {/* //==>> Llama */}
  //           {/* <ChatScreen
  //             messages={messages}
  //             onSend={onSend}
  //             onClose={handleClose}
  //           /> */}

  //           {/* //==>> Grok */}
  //             <ChatScreen
  //               messages={messages}
  //               setMessages={setMessages}
  //               onClose={handleClose}
  //               systemPrompt={systemPrompt}
  //               contextData={contextData}
  //               onError={handleError}
  //             />
  //         </View>
  //       </Modal>
  //       {/* ============================================ GrowMesh */}
  //     </View>
  //   );
  // }

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
