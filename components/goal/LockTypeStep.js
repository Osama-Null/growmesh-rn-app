import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const LockTypeStep = ({ onNext, onBack, setLockType }) => {
  const [selectedLockType, setSelectedLockType] = useState(null);

  const lockTypes = [
    { id: 1, title: "Time-Based", value: "TimeBased", description: "Set a target date to achieve your goal." },
    { id: 2, title: "Amount-Based", value: "AmountBased", description: "Focus on reaching a specific amount." },
  ];

  const handleContinue = () => {
    if (!selectedLockType) {
      alert("Please select a lock type.");
      return;
    }
    setLockType(selectedLockType);
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Goal Type</Text>
      <Text style={styles.subtitle}>Select how you want to structure your savings goal.</Text>

      <View style={styles.optionsContainer}>
        {lockTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.optionCard,
              selectedLockType === type.value && styles.selectedOption,
            ]}
            onPress={() => setSelectedLockType(type.value)}
          >
            <Text style={styles.optionTitle}>{type.title}</Text>
            <Text style={styles.optionDescription}>{type.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 16,
    color: "#1e1e1e80",
    marginBottom: 32,
    fontFamily: "Roboto",
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    minHeight: 100,
  },
  selectedOption: {
    backgroundColor: "#2F3039",
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  optionDescription: {
    fontSize: 14,
    color: "#1e1e1e80",
    fontFamily: "Roboto",
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

export default LockTypeStep;