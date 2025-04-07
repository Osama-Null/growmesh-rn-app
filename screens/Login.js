import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Svg, Path, G, Rect, ClipPath, Defs } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
      fill="#1D1B20"
    />
  </Svg>
);

const EyeIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_10_249)">
      <Path
        d="M0.833252 10C0.833252 10 4.16658 3.33333 9.99992 3.33333C15.8333 3.33333 19.1666 10 19.1666 10C19.1666 10 15.8333 16.6667 9.99992 16.6667C4.16658 16.6667 0.833252 10 0.833252 10Z"
        stroke="#1E1E1E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99992 12.5C11.3806 12.5 12.4999 11.3807 12.4999 10C12.4999 8.61929 11.3806 7.5 9.99992 7.5C8.61921 7.5 7.49992 8.61929 7.49992 10C7.49992 11.3807 8.61921 12.5 9.99992 12.5Z"
        stroke="#1E1E1E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_10_249">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const CheckboxIcon = ({ checked }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    {checked ? (
      <Path
        d="M4.616 19C4.168 19 3.78667 18.8427 3.472 18.528C3.15733 18.2133 3 17.8323 3 17.385V6.615C3 6.16833 3.15733 5.78733 3.472 5.472C3.78667 5.15733 4.168 5 4.616 5H19.385C19.8317 5 20.2127 5.15733 20.528 5.472C20.8427 5.78667 21 6.168 21 6.616V17.385C21 17.8317 20.8427 18.2127 20.528 18.528C20.2133 18.8427 19.8323 19 19.385 19H4.616ZM10.0714 15L18 7.07143L16.9286 6L10.0714 12.8571L7.07143 9.85714L6 10.9286L10.0714 15Z"
        fill="#2F3039"
      />
    ) : (
      <Path
        d="M4.616 19C4.168 19 3.78667 18.8427 3.472 18.528C3.15733 18.2133 3 17.8323 3 17.385V6.615C3 6.16833 3.15733 5.78733 3.472 5.472C3.78667 5.15733 4.168 5 4.616 5H19.385C19.8317 5 20.2127 5.15733 20.528 5.472C20.8427 5.78667 21 6.168 21 6.616V17.385C21 17.8317 20.8427 18.2127 20.528 18.528C20.2133 18.8427 19.8323 19 19.385 19H4.616ZM4.616 18H19.385C19.5643 18 19.7117 17.9423 19.827 17.827C19.9423 17.7117 20 17.5643 20 17.385V6.615C20 6.43567 19.9423 6.28833 19.827 6.173C19.7117 6.05767 19.5643 6 19.385 6H4.615C4.43567 6 4.28833 6.05767 4.173 6.173C4.05767 6.28833 4 6.436 4 6.616V17.385C4 17.5643 4.05767 17.7117 4.173 17.827C4.28833 17.9423 4.436 18 4.616 18Z"
        fill="black"
      />
    )}
  </Svg>
);

const GoogleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3.064 7.51C3.89638 5.85353 5.17282 4.46106 6.7508 3.48806C8.32878 2.51507 10.1462 1.99987 12 2C14.695 2 16.959 2.991 18.69 4.605L15.823 7.473C14.786 6.482 13.468 5.977 12 5.977C9.395 5.977 7.19 7.737 6.405 10.1C6.205 10.7 6.091 11.34 6.091 12C6.091 12.66 6.205 13.3 6.405 13.9C7.191 16.264 9.395 18.023 12 18.023C13.345 18.023 14.49 17.668 15.386 17.068C15.9054 16.726 16.3501 16.2822 16.6932 15.7635C17.0363 15.2448 17.2706 14.6619 17.382 14.05H12V10.182H21.418C21.536 10.836 21.6 11.518 21.6 12.227C21.6 15.273 20.51 17.837 18.618 19.577C16.964 21.105 14.7 22 12 22C10.6866 22.0005 9.38604 21.7422 8.17254 21.2399C6.95905 20.7375 5.85645 20.0009 4.92776 19.0722C3.99907 18.1436 3.2625 17.0409 2.76013 15.8275C2.25777 14.614 1.99948 13.3134 2 12C2 10.386 2.386 8.86 3.064 7.51Z"
      fill="black"
    />
  </Svg>
);

const AppleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.05 20.28C16.07 21.23 15 21.08 13.97 20.63C12.88 20.17 11.88 20.15 10.73 20.63C9.29004 21.25 8.53004 21.07 7.67004 20.28C2.79004 15.25 3.51004 7.59 9.05004 7.31C10.4 7.38 11.34 8.05 12.13 8.11C13.31 7.87 14.44 7.18 15.7 7.27C17.21 7.39 18.35 7.99 19.1 9.07C15.98 10.94 16.72 15.05 19.58 16.2C19.01 17.7 18.27 19.19 17.04 20.29L17.05 20.28ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3C16.06 5.58 13.43 7.5 12.03 7.25Z"
      fill="black"
    />
  </Svg>
);

const Login = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackIcon />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to your account below.</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="rgba(30,30,30,0.27)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="rgba(30,30,30,0.27)"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <EyeIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rememberContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <CheckboxIcon checked={rememberMe} />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <GoogleIcon />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <AppleIcon />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 16,
    top: 20,
    width: 44,
    height: 44,
    zIndex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
    maxWidth: Dimensions.get("window").width,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 53,
    width: 24,
    height: 24,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 32,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    height: 60,
    width: "100%",
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "white",
    color: "#1E1E1E",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rememberText: {
    fontSize: 16,
    color: "#000",
  },
  forgotText: {
    fontSize: 16,
    color: "#000",
  },
  loginButton: {
    height: 60,
    width: "100%",
    borderRadius: 39,
    backgroundColor: "#2F3039",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 42,
  },
  loginButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  dividerText: {
    color: "#000",
    fontSize: 16,
  },
  socialButton: {
    width: "100%",
    height: 60,
    borderRadius: 39,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
    marginBottom: 16,
    backgroundColor: "#FEF7FF",
  },
  socialButtonText: {
    fontSize: 16,
    color: "#1E1E1E",
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

export default Login;
