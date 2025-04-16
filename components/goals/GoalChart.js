import { StyleSheet, View, Image, Dimensions } from "react-native";
import React from "react";

const GoalChart = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/charttest 2.png")}
        style={styles.chart}
        resizeMode="contain"
      />
    </View>
  );
};

export default GoalChart;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  chart: {
    width: Dimensions.get("window").width - 32,
    height: 200,
  },
});
