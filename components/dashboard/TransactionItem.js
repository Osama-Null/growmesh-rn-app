import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Svg, Path } from "react-native-svg";

const TransactionItem = ({ title, amount, color, progress, icon }) => (
  <View style={styles.transactionItem}>
    <View style={[styles.transactionIcon, { backgroundColor: color + "20" }]}>
      {icon || (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
            fill={color}
          />
        </Svg>
      )}
    </View>
    <View style={styles.transactionDetails}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionAmount}>{amount}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: color,
                width: `${progress}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  transactionItem: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  transactionTitle: {
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    fontWeight: "600",
    fontSize: 16,
    color: "#1E1E1E",
  },
  transactionAmount: {
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#1E1E1E",
    opacity: 0.6,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    width: 40,
  },
});

export default TransactionItem;
