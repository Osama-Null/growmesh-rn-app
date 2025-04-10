import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
            fill="#1D1B20"
          />
        </Svg>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Let's get started!</Text>
        <Text style={styles.subtitle}>
          Create your account with your details below.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="rgba(30,30,30,0.27)"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="rgba(30,30,30,0.27)"
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="rgba(30,30,30,0.27)"
              secureTextEntry
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="rgba(30,30,30,0.27)"
              secureTextEntry
            />
          </View>
          <View style={styles.imageContainer}>
                 <LottieView
                   source={require("/Users/baderalqallaf/capstone /growmesh-rn-app/assets/register.json")}
                   autoPlay
                   loop = {false}
                   style={styles.lottieAnimation}
                 />
               </View>
               
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
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
  backButton: {
    position: "absolute",
    left: 16,
    top: 53,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
    maxWidth: Dimensions.get("window").width,
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
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 85,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
    marginBottom: 21,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 33,
    fontWeight: "400",
  },
  inputContainer: {
    gap: 23,
  },
  input: {
    width: "100%",
    height: 60,
    paddingHorizontal: 14,
    backgroundColor: "white",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: "500",
    color: "#1E1E1E",
  },
  passwordContainer: {
    position: "relative",
  },
  pencilContainer: {
    alignItems: "center",
    marginVertical: 35,
    
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#2F3039",
    borderRadius: 39,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: "#F3EDF7",
    justifyContent: "center",
    alignItems: "center",
  },imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  lottieAnimation: {
    width: Dimensions.get("window").width *0.9,
   height: Dimensions.get("window").width *0.9,
    maxWidth: 400,
    maxHeight: 400,
  },
});

export default Register;
