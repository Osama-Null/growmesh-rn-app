import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg, Path } from "react-native-svg";

const { width } = Dimensions.get("window");

const GoalLockScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="#1D1B20"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lock Your Goal</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>How would you like to lock your goal?</Text>
        <Text style={styles.subtitle}>
          Choose how you want to track your saving progress
        </Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => navigation.navigate("TargetDate")}
          >
            <View style={styles.iconContainer}>
              <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"
                  fill="#FEF7FF"
                />
              </Svg>
            </View>
            <Text style={styles.optionTitle}>Lock by Date</Text>
            <Text style={styles.optionDescription}>
              Set a target date to achieve your savings goal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() =>
              navigation.navigate("GoalType", { lockType: "amount" })
            }
          >
            <View style={styles.iconContainer}>
              <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  fill="#FEF7FF"
                />
              </Svg>
            </View>
            <Text style={styles.optionTitle}>Lock by Amount</Text>
            <Text style={styles.optionDescription}>
              Set a target amount and save at your own pace
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "20%" }]} />
        </View>
        <Text style={styles.progressText}>Step 1 of 5</Text>
      </View>
    </SafeAreaView>
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
    marginTop: -30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
    color: "#1D1B20",
    fontFamily:  "Roboto",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
    marginBottom: 12,
    fontFamily:  "Roboto",
  },
  subtitle: {
    fontSize: 16,
    color: "#1D1B20",
    opacity: 0.6,
    marginBottom: 32,
    fontFamily:  "Roboto",
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 24,
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2F3039",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1B20",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  optionDescription: {
    fontSize: 14,
    color: "#1D1B20",
    opacity: 0.6,
    fontFamily:  "Roboto",
  },
  progressContainer: {
    padding: 16,
    marginBottom: 16,
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
    color: "#1D1B20",
    opacity: 0.6,
    textAlign: "center",
    fontFamily: "Roboto",
  },
});

export default GoalLockScreen;
