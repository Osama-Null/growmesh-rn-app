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
  const [errorMessage, setErrorMessage] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      setSuccessMessage(
        `${actionType === "deposit" ? "Deposited" : "Withdrawn"} successfully.`
      );
      setSuccessVisible(true);
      setAmount("");
      Keyboard.dismiss();
      if (textInputRef.current) {
        textInputRef.current.blur();
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data || "An error occurred.";
      setErrorMessage(`Error: ${errorMessage}`);
    },
  });

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }
    setErrorMessage("");
    transferMutation.mutate(Number(amount));
  };

  const handleClose = () => {
    Keyboard.dismiss();
    setAmount("");
    setErrorMessage("");
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
    onClose();
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
    setSuccessMessage("");
    handleClose();
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
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Ionicons name="close" size={28} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{title}</Text>
              <TextInput
                ref={textInputRef}
                style={styles.amountInput}
                placeholder={placeholder}
                placeholderTextColor="#7E8D85"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text.replace(/[^0-9.]/g, ""));
                  setErrorMessage("");
                }}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                autoFocus={true}
              />
              {errorMessage && (
                <Text style={styles.transferModalErrorTxt}>{errorMessage}</Text>
              )}
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
          {successVisible && (
            <View style={styles.transferModalPopUpOverlay}>
              <View style={styles.transferModalPopUpContent}>
                <Text style={styles.transferModalPopUpMessageTxt}>
                  {successMessage}
                </Text>
                <TouchableOpacity
                  style={styles.transferModalPopUpSuccessBtn}
                  onPress={handleCloseSuccess}
                >
                  <Text style={styles.transferModalPopUpSuccessBtnTxt}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  transferModalPopUpOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  transferModalPopUpContent: {
    backgroundColor: "#FEF7FF",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    height: "20%",
  },
  transferModalPopUpMessageTxt: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  transferModalPopUpSuccessBtn: {
    backgroundColor: "rgba(9, 53, 101, 0.62)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
  },
  transferModalPopUpSuccessBtnTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  transferModalErrorTxt: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Roboto",
  },
});

export default TransferModal;
