import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const TransferModal = ({ visible, onClose, onSubmit, actionType }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }
    onSubmit(amount);
    setAmount(""); // Reset amount after submission
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            {actionType === "deposit" ? "Deposit Amount" : "Withdraw Amount"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="KWD 0.000"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholderTextColor="#1e1e1e80"
            autoFocus
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setAmount("");
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FEF7FF",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1e1e1e",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#A0A0A0",
  },
  submitButton: {
    backgroundColor: "#2F3039",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default TransferModal;
