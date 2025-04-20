import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

const TransferModal = ({ visible, onClose, goalId, actionType }) => {
  const [amount, setAmount] = useState("");

  // Animation setup
  const translateY = useSharedValue(height); // Start off-screen (bottom)

  useEffect(() => {
    // Animate in when visible, animate out when not visible
    translateY.value = withTiming(visible ? 0 : height, { duration: 300 });
  }, [visible, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    alert(
      `${actionType === "deposit" ? "Deposited" : "Withdrawn"} KWD ${Number(
        amount
      ).toFixed(3)} to/from Goal ID: ${goalId}`
    );
    setAmount("");
    onClose();
  };

  if (!visible && translateY.value === height) return null; // Don't render when fully off-screen

  const title =
    actionType === "deposit" ? "Deposit to Goal" : "Withdraw from Goal";
  const buttonText = actionType === "deposit" ? "Deposit" : "Withdraw";
  const placeholder = `Enter amount to ${
    actionType === "deposit" ? "deposit" : "withdraw"
  } (KWD)`;

  return (
    <View style={styles.modalContainer}>
      <Animated.View style={[styles.modalContent, animatedStyle]}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>{title}</Text>
        <TextInput
          style={styles.amountInput}
          placeholder={placeholder}
          placeholderTextColor="#7E8D85"
          value={amount}
          onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default TransferModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 2000, // Ensure it overlays other elements
  },
  modalContent: {
    position: "absolute",
    bottom: 0, // Anchor to the bottom
    backgroundColor: "#FEF7FF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width, // Full screen width
    minHeight: 300, // Minimum height for visibility
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  amountInput: {
    backgroundColor: "#F0F0F0",
    color: "#000",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    width: "100%", // Full width of modal content
  },
  submitButton: {
    backgroundColor: "#00F8BE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%", // Full width of modal content
  },
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
