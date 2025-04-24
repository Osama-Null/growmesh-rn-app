import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const GoalDetailsStep = ({ onNext, onBack, goalType, lockType, setGoalDetails }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (lockType === "AmountBased") {
      const amountValue = parseFloat(amount);
      if (!amount || amountValue <= 0) {
        setError("Target amount must be greater than zero.");
        return;
      }
    }
    if (description.length > 500) {
      setError("Description cannot exceed 500 characters.");
      return;
    }
    setError("");
    setGoalDetails({ amount: lockType === "AmountBased" ? amount : null, description });
    onNext();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.goalType}>{goalType} Goal</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {lockType === "AmountBased" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>How much do you want to save?</Text>
              <TextInput
                style={styles.input}
                placeholder="KWD 0.000"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                  setError("");
                }}
                keyboardType="numeric"
                placeholderTextColor="#1e1e1e80"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What are you saving for?"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                setError("");
              }}
              multiline
              numberOfLines={4}
              placeholderTextColor="#1e1e1e80"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#A0A0A0" }]}
          onPress={onBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2F3039" }]}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  goalType: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    marginBottom: 32,
    fontFamily: "Roboto",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    fontFamily: "Roboto",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1e1e1e",
    fontFamily: "Roboto",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  button: {
    width: "45%",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default GoalDetailsStep;