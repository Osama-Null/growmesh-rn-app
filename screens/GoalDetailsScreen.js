import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const GoalDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goalType } = route.params;
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Goal Details</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.goalType}>{goalType} Goal</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>How much do you want to save?</Text>
            <TextInput
              style={styles.input}
              placeholder="KWD 0.000"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholderTextColor="#1e1e1e80"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What are you saving for?"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor="#1e1e1e80"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "66%" }]} />
        </View>
        <Text style={styles.progressText}>Step 2 of 3</Text>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("GoalSchedule", {
              goalType,
              amount,
              description,
            })
          }
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    padding: 16,
    gap: 24,
  },
  goalType: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    marginBottom: 32,
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  inputGroup: {
    gap: 8,
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
  textArea: {
    height: 120,
    textAlignVertical: "top",
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
  nextButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    padding: 20,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
});

export default GoalDetailsScreen;
