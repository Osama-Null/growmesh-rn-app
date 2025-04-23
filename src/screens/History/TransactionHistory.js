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
    if (activeTab === "All") return true;
    if (activeTab === "Deposits")
      return transaction.transactionType === "deposit";
    if (activeTab === "Withdrawals")
      return transaction.transactionType === "withdraw";
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
    const isDeposit = transaction.transactionType === "deposit";

    return (
      <View key={transaction.transactionId} style={styles.transactionItem}>
        <View style={styles.transactionIcon}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: isDeposit
                  ? "rgba(0, 248, 190, 0.1)"
                  : "rgba(255, 99, 71, 0.1)",
              },
            ]}
          >
            <Ionicons
              name={isDeposit ? "arrow-up" : "arrow-down"}
              size={24}
              color={isDeposit ? "#00F8BE" : "#FF6347"}
            />
          </View>
        </View>
        <View style={styles.transactionDetails}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>
              {transaction.savingsGoalName || "Goal"}
            </Text>
            <Text
              style={[
                styles.transactionAmount,
                { color: isDeposit ? "#00F8BE" : "#FF6347" },
              ]}
            >
              {isDeposit ? "+" : "-"}KWD {transaction.amount.toFixed(3)}
            </Text>
          </View>
          <View style={styles.transactionFooter}>
            <Text style={styles.transactionDate}>
              {formatDate(transaction.transactionDate)}
            </Text>
            <Text style={styles.transactionType}>
              {isDeposit ? "Deposit" : "Withdrawal"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1D1B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.tabs}>
        {["All", "Deposits", "Withdrawals"].map((tab) => (
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
          filteredTransactions.map(renderTransaction)
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
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
  },
  transactionItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFF",
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
    marginRight: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
