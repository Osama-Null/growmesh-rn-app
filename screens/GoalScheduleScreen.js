import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const frequencies = [
  { id: 1, title: "Weekly", value: "weekly" },
  { id: 2, title: "Monthly", value: "monthly" },
  { id: 3, title: "Quarterly", value: "quarterly" },
];

const GoalScheduleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goalType, amount, description } = route.params;
  const [selectedFrequency, setSelectedFrequency] = useState("monthly");
  const [contribution, setContribution] = useState("");

  const handleComplete = () => {
    navigation.navigate("NewGoal", {
      goalType,
      amount,
      description,
      frequency: selectedFrequency,
      contribution,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saving Schedule</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>How often would you like to save?</Text>

        <View style={styles.frequencyContainer}>
          {frequencies.map((freq) => (
            <TouchableOpacity
              key={freq.id}
              style={[
                styles.frequencyOption,
                selectedFrequency === freq.value && styles.selectedFrequency,
              ]}
              onPress={() => setSelectedFrequency(freq.value)}
            >
              <Text
                style={[
                  styles.frequencyText,
                  selectedFrequency === freq.value &&
                    styles.selectedFrequencyText,
                ]}
              >
                {freq.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contribution Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="KWD 0.000"
            value={contribution}
            onChangeText={setContribution}
            keyboardType="numeric"
            placeholderTextColor="#1e1e1e80"
          />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Goal Type</Text>
            <Text style={styles.summaryValue}>{goalType}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Target Amount</Text>
            <Text style={styles.summaryValue}>KWD {amount}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Frequency</Text>
            <Text style={styles.summaryValue}>
              {selectedFrequency.charAt(0).toUpperCase() +
                selectedFrequency.slice(1)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "100%" }]} />
        </View>
        <Text style={styles.progressText}>Step 3 of 3</Text>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>Complete Setup</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 20,
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
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 24,
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  frequencyOption: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  selectedFrequency: {
    backgroundColor: "#2F3039",
  },
  frequencyText: {
    fontSize: 16,
    color: "#000",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  selectedFrequencyText: {
    color: "#FFF",
  },
  inputGroup: {
    gap: 8,
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1e1e1e",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  summaryContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    gap: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
    color: "#1e1e1e80",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  summaryValue: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  footer: {
    padding: 16,
    backgroundColor: "#FEF7FF",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
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
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  completeButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    padding: 20,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
});

export default GoalScheduleScreen;
