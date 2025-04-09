import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import TransactionItem from "./TransactionItem";

const transactions = [
  {
    id: "1",
    title: "Travel Fund",
    amount: "KWD 100",
    color: "#37C4C6",
    progress: 75,
  },
  {
    id: "2",
    title: "Emergency Savings",
    amount: "KWD 500",
    color: "#B537C6",
    progress: 45,
  },
  {
    id: "3",
    title: "New Car",
    amount: "KWD 5,000",
    color: "#D8696B",
    progress: 30,
  },
  {
    id: "4",
    title: "House Down Payment",
    amount: "KWD 10,000",
    color: "#37C4C6",
    progress: 15,
  },
];

const TransactionList = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} {...transaction} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
});

export default TransactionList;
