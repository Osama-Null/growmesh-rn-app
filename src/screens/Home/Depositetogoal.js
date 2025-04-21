// filepath:
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function DepositToGoalScreen({ route, navigation }) {
  const goal = route.params?.goal || {};
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    Alert.alert("Deposit Successful");
    setAmount("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Deposit to: {goal.title}</Text>
      <TextInput
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Deposit" onPress={handleDeposit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginBottom: 10, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
