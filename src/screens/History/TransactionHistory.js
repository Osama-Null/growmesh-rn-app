import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../api/transaction";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const TransactionHistory = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00F8BE" />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error: {error?.message || "Failed to fetch transactions"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const filteredTransactions = transactions?.filter((transaction) => {
    console.log("Transaction Type:", transaction.transactionType);
    const transactionTypeMap = {
      0: "deposit",
      1: "withdrawal",
      2: "transfertogoal",
      3: "transferfromgoal",
    };
    const transactionType =
      transactionTypeMap[transaction.transactionType?.toString()] ||
      transaction.transactionType?.toString().toLowerCase();
    if (activeTab === "All") return true;
    if (activeTab === "Deposits") return transactionType === "deposit";
    if (activeTab === "Withdrawals") return transactionType === "withdrawal";
    if (activeTab === "Transfers")
      return (
        transactionType === "transfertogoal" ||
        transactionType === "transferfromgoal"
      );
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderTransaction = (transaction) => {
    const transactionTypeMap = {
      0: "deposit",
      1: "withdrawal",
      2: "transfertogoal",
      3: "transferfromgoal",
    };
    const transactionType =
      transactionTypeMap[transaction.transactionType?.toString()] ||
      transaction.transactionType?.toString().toLowerCase();

    let icon, backgroundColor, color, label, amountPrefix;

    switch (transactionType) {
      case "deposit":
        icon = "arrow-up";
        backgroundColor = "rgba(0, 248, 190, 0.1)";
        color = "#00F8BE";
        label = "Deposit";
        amountPrefix = "+";
        break;
      case "withdrawal":
        icon = "arrow-down";
        backgroundColor = "rgba(255, 99, 71, 0.1)";
        color = "#FF6347";
        label = "Withdrawal";
        amountPrefix = "-";
        break;
      case "transfertogoal":
        icon = "swap-horizontal";
        backgroundColor = "rgba(255, 215, 0, 0.1)";
        color = "#FFD700";
        label = "Transfer to Goal";
        amountPrefix = "-";
        break;
      case "transferfromgoal":
        icon = "swap-horizontal";
        backgroundColor = "rgba(0, 191, 255, 0.1)";
        color = "#00BFFF";
        label = "Transfer from Goal";
        amountPrefix = "+";
        break;
      default:
        console.log("Unknown transaction type:", transaction.transactionType);
        icon = "help-circle";
        backgroundColor = "rgba(128, 128, 128, 0.1)";
        color = "#808080";
        label = "Unknown";
        amountPrefix = "";
    }

    console.log("Rendering icon:", icon, "with color:", color);

    return (
      <View key={transaction.transactionId} style={styles.transactionItem}>
        <View style={styles.transactionIcon}>
          <Ionicons
            name={icon}
            size={24}
            color={color}
            style={{ marginRight: 8 }}
          />
        </View>
        <View style={styles.transactionDetails}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>
              {transaction.savingsGoalName || "Goal"}
            </Text>
            <Text style={[styles.transactionAmount, { color }]}>
              {amountPrefix}KWD {transaction.amount}
            </Text>
          </View>
          <View style={styles.transactionFooter}>
            <Text style={styles.transactionDate}>
              {formatDate(transaction.transactionDate)}
            </Text>
            <Text style={styles.transactionType}>{label}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>

      <View style={styles.tabs}>
        {["All", "Transfers", "Deposits", "Withdrawals"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.transactionList}>
        {filteredTransactions?.length > 0 ? (
          [...filteredTransactions].reverse().map(renderTransaction)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
    paddingBottom: 90,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginLeft: -24,
  },
  headerRight: {
    width: 24,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(30,30,30,0.09)",
  },
  activeTab: {
    backgroundColor: "#2F3039",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  activeTabText: {
    color: "#FFF",
  },
  transactionList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  transactionItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#EBE5EC",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  transactionIcon: {
    flexDirection: "row",
    marginRight: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  transactionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionDate: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
  },
  transactionType: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
  },
});

export default TransactionHistory;
