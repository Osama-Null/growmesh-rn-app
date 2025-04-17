import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const IntroStep = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>LET'S CREATE A SAVINGS{"\n"}GOAL!</Text>
      </View>

      <View style={styles.imageContainer}>
        <LottieView
          source={require("../../assets/savinggoal.json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={onNext}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    marginTop: 38,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
    lineHeight: 35,
    fontFamily: "Roboto",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  lottieAnimation: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    maxWidth: 400,
    maxHeight: 400,
  },
  startButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    width: "90%",
    maxWidth: 380,
    paddingVertical: 22,
    marginTop: 46,
    alignItems: "center",
  },
  startButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default IntroStep;