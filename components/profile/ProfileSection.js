import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const ProfileSection = ({ title, value }) => (
  <View style={styles.profileSection}>
    <Text style={styles.sectionLabel}>{title}</Text>
    <View style={styles.sectionContent}>
      <Text style={styles.sectionValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  profileSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    color: "#1D1B20",
    opacity: 0.6,
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  sectionContent: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 14,
    padding: 16,
  },
  sectionValue: {
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default ProfileSection;
