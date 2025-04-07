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

const Register = () => {
  const navigation = useNavigation();
  const PencilIcon = () => (
    <Svg width="118" height="114" viewBox="0 0 118 114" fill="none">
      <Path
        d="M83.5834 14.25C84.8747 13.0024 86.4077 12.0128 88.0949 11.3377C89.7822 10.6625 91.5905 10.315 93.4167 10.315C95.2429 10.315 97.0513 10.6625 98.7385 11.3377C100.426 12.0128 101.959 13.0024 103.25 14.25C104.541 15.4976 105.566 16.9786 106.265 18.6086C106.963 20.2387 107.323 21.9857 107.323 23.75C107.323 25.5143 106.963 27.2614 106.265 28.8914C105.566 30.5214 104.541 32.0024 103.25 33.25L36.875 97.375L9.83337 104.5L17.2084 78.375L83.5834 14.25Z"
        stroke="#1E1E1E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

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
        </View>

        <View style={styles.pencilContainer}>
          <PencilIcon />
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
    marginTop: 88,
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
  },
});

export default Register;
