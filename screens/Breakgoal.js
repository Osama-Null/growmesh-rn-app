import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

export default function BreakGoalScreen() {
  const handleBreakPress = () => {
    Alert.alert(
      "Break Saving Goal",
      "Are you sure you want to break this goal?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Break",
          style: "destructive",
          onPress: () => {
            Alert.alert("Goal Broken ", "Funds are now accessible.");
          },
        },
      ]
    );

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.amountText}>KWD 100 / 100</Text>
      <LottieView
        source={require("../assets/lottie/break.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      <TouchableOpacity style={styles.breakButton} onPress={handleBreakPress}>
        <Text style={styles.breakText}>Break</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  amountText: {
    fontSize: 20,
    marginBottom: 20,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  breakButton: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  breakText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
