import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTimeBasedSavingsGoal,
  createAmountBasedSavingsGoal,
} from "../../api/savingsGoal";

const Step3Final = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goalData } = route.params; // Data from Step2
  const queryClient = useQueryClient();

  const [isInitialPaymentEnabled, setIsInitialPaymentEnabled] = useState(false);
  const [initialPaymentMethod, setInitialPaymentMethod] = useState(null); // "Automatic" or "Manual"
  const [initialPaymentAmount, setInitialPaymentAmount] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");
  const [paymentAmountError, setPaymentAmountError] = useState("");
  const [backendError, setBackendError] = useState(""); // For backend error messages

  // Determine goal type based on goalData
  const isTimeBased = !!goalData.targetDate;

  const animatedValue = useRef(
    new Animated.Value(isInitialPaymentEnabled ? 1 : 0)
  ).current;
  const trackWidth = 50;
  const trackHeight = 24;
  const thumbSize = 16;
  const thumbTravel = trackWidth - thumbSize - 4;

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, thumbTravel],
  });

  const toggleSwitch = () => {
    const newValue = !isInitialPaymentEnabled;
    setIsInitialPaymentEnabled(newValue);
    setPaymentMethodError("");
    setPaymentAmountError("");
    setBackendError(""); // Clear backend error on toggle
    Animated.spring(animatedValue, {
      toValue: newValue ? 1 : 0,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePaymentMethodPress = (method) => {
    if (!isInitialPaymentEnabled) {
      setPaymentMethodError(
        "Initial payment must be enabled to select a method"
      );
    } else {
      setPaymentMethodError("");
      setBackendError(""); // Clear backend error when changing method
      setInitialPaymentMethod(method);
    }
  };

  const handlePaymentAmountPress = () => {
    if (!isInitialPaymentEnabled || initialPaymentMethod !== "Manual") {
      setPaymentAmountError(
        initialPaymentMethod !== "Manual"
          ? "Manual payment method must be selected to enter an amount"
          : "Initial payment must be enabled to enter an amount"
      );
    } else {
      setPaymentAmountError("");
      setBackendError(""); // Clear backend error when focusing on amount
    }
  };

  const mutation = useMutation({
    mutationFn: isTimeBased
      ? createTimeBasedSavingsGoal
      : createAmountBasedSavingsGoal,
    onSuccess: () => {
      console.log("Mutation Success: Goal created successfully");
      queryClient.invalidateQueries(["savingsGoals"]);
      alert("Success", "Goal created successfully", [{ text: "OK" }]);
      navigation.navigate("HomeScreenAdd");
    },
    onError: (error) => {
      console.error("Mutation Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        fullError: error,
      });
      // Handle both cases: error.response.data as a string or an object with a message property
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
            error.message ||
            "Failed to create goal";
      setBackendError(errorMessage);
    },
  });

  const handleCreate = () => {
    // Reset all errors
    setPaymentMethodError("");
    setPaymentAmountError("");
    setBackendError("");

    let hasError = false;

    if (isInitialPaymentEnabled) {
      if (!initialPaymentMethod) {
        setPaymentMethodError("Please select an initial payment method");
        hasError = true;
      }
      if (
        !initialPaymentAmount ||
        isNaN(parseFloat(initialPaymentAmount)) ||
        parseFloat(initialPaymentAmount) <= 0
      ) {
        setPaymentAmountError(
          "Initial payment amount must be a valid number greater than zero"
        );
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    const payload = {
      savingsGoalName: goalData.savingsGoalName,
      targetDate: isTimeBased ? goalData.targetDate : undefined,
      targetAmount: isTimeBased ? undefined : goalData.targetAmount,
      description: goalData.description,
      emoji: goalData.emoji,
      color: goalData.color,
      depositFrequency: goalData.depositFrequency,
      depositAmount: goalData.depositAmount,
      customDepositIntervalDays: goalData.customDepositIntervalDays
        ? parseInt(goalData.customDepositIntervalDays)
        : null,
      initialManualPayment:
        isInitialPaymentEnabled && initialPaymentMethod === "Manual",
      initialAutomaticPayment:
        isInitialPaymentEnabled && initialPaymentMethod === "Automatic",
      initialManualPaymentAmount:
        isInitialPaymentEnabled && initialPaymentAmount
          ? parseFloat(initialPaymentAmount)
          : null,
    };

    console.log("Creating Goal with Payload:", payload);
    console.log("Goal Type:", isTimeBased ? "TimeBased" : "AmountBased");
    console.log("Goal Data from Step2:", goalData);

    mutation.mutate(payload);
  };

  const isPaymentMethodEditable = isInitialPaymentEnabled;
  const isPaymentAmountEditable =
    isInitialPaymentEnabled && initialPaymentMethod === "Manual";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>{"Transaction details"}</Text>
        <View style={styles.column}>
          <View style={styles.column2}>
            <View style={styles.column3}>
              <View style={styles.row}>
                <Text style={styles.text2}>{"Initial Payment"}</Text>
                <Pressable onPress={toggleSwitch}>
                  <View
                    style={[
                      styles.track,
                      {
                        width: trackWidth,
                        height: trackHeight,
                        backgroundColor: isInitialPaymentEnabled
                          ? "rgb(9, 53, 101)"
                          : "#767577",
                      },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.thumb,
                        {
                          width: thumbSize,
                          height: thumbSize,
                          transform: [{ translateX: thumbPosition }],
                          backgroundColor: isInitialPaymentEnabled
                            ? "#f4f3f4"
                            : "#f4f3f4",
                        },
                      ]}
                    />
                  </View>
                </Pressable>
              </View>
              <Text style={styles.text3}>
                {"Do you want to make first payment today?"}
              </Text>
            </View>
            <View style={styles.column3}>
              <Text style={styles.text4}>{"Initial Payment Method"}</Text>
              <View style={styles.row2}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    initialPaymentMethod === "Automatic" &&
                      styles.selectedButton,
                    !isPaymentMethodEditable && styles.disabledInput,
                  ]}
                  onPress={() => handlePaymentMethodPress("Automatic")}
                >
                  <Text
                    style={[
                      styles.text5,
                      initialPaymentMethod === "Automatic" &&
                        styles.selectedText,
                    ]}
                  >
                    {"Automatic"}
                  </Text>
                  {!isPaymentMethodEditable && (
                    <Ionicons
                      name="lock-closed"
                      size={20}
                      color="#888"
                      style={styles.lockIcon2}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button2,
                    initialPaymentMethod === "Manual" && styles.selectedButton,
                    !isPaymentMethodEditable && styles.disabledInput,
                  ]}
                  onPress={() => handlePaymentMethodPress("Manual")}
                >
                  <Text
                    style={[
                      styles.text5,
                      initialPaymentMethod === "Manual" && styles.selectedText,
                    ]}
                  >
                    {"Manual"}
                  </Text>
                  {!isPaymentMethodEditable && (
                    <Ionicons
                      name="lock-closed"
                      size={20}
                      color="#888"
                      style={styles.lockIcon2}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {paymentMethodError && (
                <Text style={styles.errorText}>{paymentMethodError}</Text>
              )}
            </View>
            <View>
              <Text style={styles.text6}>{"Initial payment amount"}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={"KWD"}
                  placeholderTextColor="rgba(30,30,30,0.27)"
                  value={initialPaymentAmount}
                  onChangeText={(text) => {
                    setInitialPaymentAmount(text);
                    setPaymentAmountError("");
                    setBackendError(""); // Clear errors when user types
                  }}
                  style={[
                    styles.input,
                    !isPaymentAmountEditable && styles.disabledInput,
                  ]}
                  keyboardType="numeric"
                  editable={isPaymentAmountEditable}
                  onFocus={handlePaymentAmountPress}
                />
                {!isPaymentAmountEditable && (
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color="#888"
                    style={styles.lockIcon}
                  />
                )}
              </View>
              {paymentAmountError && (
                <Text style={styles.errorText}>{paymentAmountError}</Text>
              )}
              {backendError && (
                <Text style={styles.errorText}>{backendError}</Text>
              )}
            </View>
          </View>
          <View style={styles.box}></View>
          <View>
            <Text style={styles.text7}>{"Summary"}</Text>
            <View style={styles.column4}>
              <View style={styles.row}>
                <Text style={styles.field}>{"Goal Type"}</Text>
                <View style={styles.val}>
                  <Text style={styles.valText}>
                    {isTimeBased ? "Time Based" : "Amount Based"}
                  </Text>
                </View>
              </View>
              {isTimeBased ? (
                <View style={styles.row}>
                  <Text style={styles.field}>{"Target Date"}</Text>
                  <View style={styles.val}>
                    <Text style={styles.valText}>
                      {goalData.targetDate
                        ? new Date(goalData.targetDate).toLocaleDateString(
                            "en-GB"
                          )
                        : "— — —"}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.row}>
                  <Text style={styles.field}>{"Target Amount"}</Text>
                  <View style={styles.val}>
                    <Text style={styles.valText}>
                      {goalData.targetAmount
                        ? `KWD ${goalData.targetAmount}`
                        : "— — —"}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.row}>
                <Text style={styles.field}>{"Initial Payment"}</Text>
                <View style={styles.val}>
                  <Text style={styles.valText}>
                    {isInitialPaymentEnabled
                      ? `${initialPaymentMethod}: KWD ${
                          initialPaymentAmount || "0"
                        }`
                      : "— — —"}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.field}>{"Frequency"}</Text>
                <View style={styles.val}>
                  <Text style={styles.valText}>
                    {goalData.depositFrequency || "— — —"}
                  </Text>
                </View>
              </View>
              {goalData.depositFrequency === "Custom" && (
                <View style={styles.row}>
                  <Text style={styles.field}>{"Custom Days"}</Text>
                  <View style={styles.val}>
                    <Text style={styles.valText}>
                      {`Every ${goalData.customDepositIntervalDays} Days`}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.row}>
                <Text style={styles.field}>{"Deposit Amount"}</Text>
                <View style={styles.val}>
                  <Text style={styles.valText}>
                    {goalData.depositAmount
                      ? `KWD ${goalData.depositAmount}`
                      : "— — —"}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.field}>{"Color"}</Text>
                <View style={styles.val}>
                  <Text style={styles.valText}>
                    {goalData.color || "— — —"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.steps}>{"Step 3 of 3"}</Text>
        <View style={styles.progress}></View>
        <TouchableOpacity style={styles.nextButton} onPress={handleCreate}>
          <Text style={styles.next}>{"Create"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step3Final;

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    position: "absolute",
    top: 10,
    left: 16,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 16,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    gap: 10,
  },
  steps: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  progress: {
    height: 9,
    backgroundColor: "#D9D9D9",
    borderRadius: 51,
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: "#2E3039",
    borderRadius: 39,
    paddingVertical: 22,
  },
  track: {
    borderRadius: 12,
    marginLeft: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  thumb: {
    borderRadius: 8,
  },
  box: {
    height: 1,
    backgroundColor: "#0000004F",
    marginBottom: 23,
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 7,
    paddingVertical: 17,
    marginRight: 10,
    position: "relative",
  },
  button2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 7,
    paddingVertical: 17,
    position: "relative",
  },
  selectedButton: {
    backgroundColor: "#2E3039",
  },
  text5: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  column: {
    marginBottom: 21,
  },
  column2: {
    marginBottom: 53,
  },
  column3: {
    marginBottom: 21,
  },
  column4: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 33,
    paddingHorizontal: 35,
    gap: 15,
  },
  input: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 22,
    paddingLeft: 13,
    paddingRight: 26,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  lockIcon: {
    position: "absolute",
    right: 10,
  },
  lockIcon2: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  disabledInput: {
    opacity: 0.5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 2,
    justifyContent: "space-between",
    width: "100%",
  },
  row2: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 21,
  },
  text2: {
    color: "#1E1E1E",
    fontSize: 16,
    flex: 1,
  },
  text3: {
    color: "#757575",
    fontSize: 16,
  },
  text4: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 9,
  },
  text6: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text7: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 9,
  },
  field: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
  },
  val: {
    width: "auto",
  },
  valText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  next: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
