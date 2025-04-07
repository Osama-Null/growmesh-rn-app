import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.timeText}>9:30</Text> */}
      </View>

      <View style={styles.content}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandLetter}>G</Text>
          <Text style={styles.brandText}>Welcome to GrowMesh</Text>
        </View>

        <Text style={styles.title}>A NETWORK OF GOALS COMING TOGETHER</Text>

        <View style={styles.imageContainer}>
          <LottieView
            source={require("/Users/baderalqallaf/growmesh/growmesh-rn-app/assets/Animation - 1743935031574.json")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.createButtonText}>Create account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    height: 52,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1B20",
    letterSpacing: 0.14,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
  },
  brandLetter: {
    fontWeight: "700",
    color: "#000",
    fontSize: 16,
  },
  brandText: {
    fontSize: 16,
    color: "#000",
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
    lineHeight: 35,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  lottieAnimation: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.8,
    maxWidth: 400,
    maxHeight: 400,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 11,
    padding: 16,
    marginTop: "auto",
  },
  createButton: {
    height: 60,
    borderRadius: 39,
    backgroundColor: "#2F3039",
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  loginButton: {
    height: 60,
    borderRadius: 39,
    backgroundColor: "#FEF7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#1E1E1E",
    fontSize: 16,
  },
  footer: {
    height: 24,
    backgroundColor: "#F3EDF7",
    justifyContent: "center",
    alignItems: "center",
  },
  footerLine: {
    width: 108,
    height: 4,
    borderRadius: 12,
    backgroundColor: "#1D1B20",
  },
});

export default Welcome;
