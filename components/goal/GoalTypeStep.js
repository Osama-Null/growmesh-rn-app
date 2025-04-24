import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import goalTypes from "../../src/data/goalTypes";

const { width } = Dimensions.get("window");

const GoalTypeStep = ({ onNext, onBack, setGoalType }) => {
  const [customGoalType, setCustomGoalType] = useState("");
  const [error, setError] = useState("");

  const handleSelectGoal = (type) => {
    if (type.length > 100) {
      setError("Goal type cannot exceed 100 characters.");
      return;
    }
    setError("");
    setGoalType(type);
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Select the type of goal you want to achieve
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.goalsGrid}>
        {goalTypes.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={styles.goalCard}
            onPress={() => handleSelectGoal(goal.title)}
          >
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={styles.goalDescription}>{goal.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.customGoalContainer}>
        <Text style={styles.customGoalLabel}>Or create your own goal type</Text>
        <View style={styles.customInputContainer}>
          <TextInput
            style={styles.customInput}
            placeholder="Enter custom goal type"
            value={customGoalType}
            onChangeText={(text) => {
              setCustomGoalType(text);
              setError("");
            }}
            placeholderTextColor="#1e1e1e80"
          />
          <TouchableOpacity
            style={[
              styles.customGoalButton,
              !customGoalType && styles.customGoalButtonDisabled,
            ]}
            disabled={!customGoalType}
            onPress={() => handleSelectGoal(customGoalType)}
          >
            <Text
              style={[
                styles.customGoalButtonText,
                !customGoalType && styles.customGoalButtonTextDisabled,
              ]}
            >
              Use Custom Goal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#A0A0A0" }]}
          onPress={onBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2F3039", opacity: 0.5 }]}
          disabled
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
    paddingHorizontal: 24, // Increased padding for more space
    paddingVertical: 16,
    backgroundColor: "#FEF7FF",
  },
  subtitle: {
    fontSize: 16,
    color: "#1e1e1e80",
    marginBottom: 24, // Reduced from 32 for tighter spacing
    fontFamily: "Roboto",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 16, // Added margin for separation
    fontFamily: "Roboto",
  },
  goalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20, // Added margin to separate from custom goal section
  },
  goalCard: {
    width: 165, // Adjusted for new padding (24 + 24 + 16 gap)
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 1,
    minHeight: 120,
    //backgroundColor :'red'
    borderWidth : 0.2,
    borderColor :'grey'
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    alignSelf :'center',
    color: "#000",
    fontFamily: "Roboto",
    padding : 10
  },
  goalDescription: {
    fontSize: 14,
    color: "#1e1e1e80",
    fontFamily: "Roboto",
    padding : 10,
    alignContent :'space-evenly'
  },
  customGoalContainer: {
    marginTop: 16, 
    paddingHorizontal: 0, 
  },
  customGoalLabel: {
    fontSize: 16,
    color: "#1e1e1e80",
    marginBottom: 12,
    fontFamily: "Roboto",
  },
  customInputContainer: {
    gap: 16, // Increased from 12 for better separation
  },
  customInput: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1e1e1e",
    fontFamily: "Roboto",
  },
  customGoalButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    padding: 16,
    alignItems: "center",
  },
  customGoalButtonDisabled: {
    backgroundColor: "rgba(47, 48, 57, 0.5)",
  },
  customGoalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  customGoalButtonTextDisabled: {
    color: "#FFF",
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8, // Reduced padding for tighter spacing
  },
  button: {
    width: "48%", // Adjusted to ensure even spacing
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

export default GoalTypeStep;