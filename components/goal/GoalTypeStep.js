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

  const handleSelectGoal = (type) => {
    setGoalType(type);
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Select the type of goal you want to achieve
      </Text>

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
            onChangeText={setCustomGoalType}
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
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#1e1e1e80",
    marginBottom: 32,
    fontFamily: "Roboto",
  },
  goalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  goalCard: {
    width: (width - 48) / 2,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    minHeight: 120,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
    fontFamily: "Roboto",
  },
  goalDescription: {
    fontSize: 14,
    color: "#1e1e1e80",
    fontFamily: "Roboto",
  },
  customGoalContainer: {
    marginTop: 24,
    padding: 16,
  },
  customGoalLabel: {
    fontSize: 16,
    color: "#1e1e1e80",
    marginBottom: 12,
    fontFamily: "Roboto",
  },
  customInputContainer: {
    gap: 12,
  },
  customInput: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1e1e1e",
    fontFamily:  "Roboto",
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
 
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
    fontFamily:  "Roboto",
  },
  subtitle: {
    fontSize: 16,
    color: "#1e1e1e80",
    marginBottom: 32,
    fontFamily:  "Roboto",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    minHeight: 120,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
    fontFamily:  "Roboto",
  },
  goalDescription: {
    fontSize: 14,
    color: "#1e1e1e80",
    fontFamily: "Roboto",
  },
  progressContainer: {
    position: "absolute",
    bottom: 32,
    left: 16,
    right: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 2,
    marginBottom: 8,
  },
  button: {
    width: "45%",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#1e1e1e80",
    textAlign: "center",
    fontFamily:  "Roboto",
  },
});

export default GoalTypeStep;