import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  depositToSavingsGoal,
  withdrawFromSavingsGoal,
} from "../api/savingsGoal";

const TransferModal = ({ visible, onClose, goalId, actionType }) => {
  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();
  const textInputRef = useRef(null);

  const transferMutation = useMutation({
    mutationFn: (amount) => {
      const transferInfo = { amount };
      if (actionType === "deposit") {
        return depositToSavingsGoal(goalId, transferInfo);
      } else if (actionType === "withdraw") {
        return withdrawFromSavingsGoal(goalId, transferInfo);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchSavingsGoalDetails", goalId]);
      queryClient.invalidateQueries(["fetchTransactionsBySavingsGoal", goalId]);
      queryClient.invalidateQueries(["fetchSavingsGoalTrend", goalId]);
      alert(
        `${actionType === "deposit" ? "Deposited" : "Withdrawn"} successfully.`
      );
      setAmount("");
      Keyboard.dismiss();
      if (textInputRef.current) {
        textInputRef.current.blur();
      }
      onClose();
    },
    onError: (error) => {
      const errorMessage = error.response?.data || "An error occurred.";
      alert(`Error: ${errorMessage}`);
    },
  });

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    transferMutation.mutate(Number(amount));
  };

  const handleClose = () => {
    Keyboard.dismiss();
    setAmount("");
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
    onClose();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  const title =
    actionType === "deposit" ? "Deposit to Goal" : "Withdraw from Goal";
  const buttonText = actionType === "deposit" ? "Deposit" : "Withdraw";
  const placeholder = `Enter amount to ${
    actionType === "deposit" ? "deposit" : "withdraw"
  } (KWD)`;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Ionicons name="close" size={28} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{title}</Text>
              <TextInput
                ref={textInputRef}
                style={styles.amountInput}
                placeholder={placeholder}
                placeholderTextColor="#7E8D85"
                value={amount}
                onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                autoFocus={true}
              />
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  transferMutation.isLoading && styles.disabledButton,
                ]}
                onPress={handleSubmit}
                disabled={transferMutation.isLoading}
              >
                <Text style={styles.submitButtonText}>
                  {transferMutation.isLoading ? "Processing..." : buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  keyboardAvoidingView: {
    width: "100%",
  },
  modalContent: {
    backgroundColor: "#FEF7FF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    color: "#000",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#rgba(9, 53, 101, 0.62)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
    opacity: 0.7,
  },
});

export default TransferModal;