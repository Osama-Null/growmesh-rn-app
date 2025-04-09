import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const goalTypes = [
  { id: 1, title: "Travel", description: "Save for your next adventure" },
  { id: 2, title: "Emergency", description: "Build your safety net" },
  { id: 3, title: "Education", description: "Invest in your future" },
  { id: 4, title: "Home", description: "Save for your dream home" },
];

const GoalTypeScreen = () => {
  const navigation = useNavigation();
  const [customGoalType, setCustomGoalType] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Goal Type</Text>
      </View>

      <Text style={styles.subtitle}>
        Select the type of goal you want to achieve
      </Text>

      <View style={styles.goalsGrid}>
        {goalTypes.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={styles.goalCard}
            onPress={() =>
              navigation.navigate("GoalDetails", { goalType: goal.title })
            }
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
            onPress={() =>
              navigation.navigate("GoalDetails", { goalType: customGoalType })
            }
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
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "33%" }]} />
        </View>
        <Text style={styles.progressText}>Step 1 of 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customGoalContainer: {
    marginTop: 24,
    padding: 16,
  },
  customGoalLabel: {
    fontSize: 16,
    color: "#1e1e1e80",
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
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
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
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
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
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
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  subtitle: {
    fontSize: 16,
    color: "#1e1e1e80",
    marginBottom: 32,
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
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
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  goalDescription: {
    fontSize: 14,
    color: "#1e1e1e80",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
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
  progressFill: {
    height: "100%",
    backgroundColor: "#2F3039",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: "#1e1e1e80",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
});

export default GoalTypeScreen;
