
// filepath:
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function WithdrawFromGoalScreen({ route, navigation }) {
  const goal = route.params?.goal || {};
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    Alert.alert(
      "Withdrawal Successful",
      `You withdrew KWD ${amount} from ${goal.title}`,
    );
    setAmount("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Withdraw from: {goal.title}</Text>
      <TextInput
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Withdraw" onPress={handleWithdraw} />
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
