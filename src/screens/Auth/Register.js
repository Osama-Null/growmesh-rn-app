import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import UserContext from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

const Register = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const { setIsAuth } = useContext(UserContext) || { setIsAuth: () => {} };
  const [step, setStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);

  const totalSteps = 3;

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo, image),
    onSuccess: () => {
      alert("Account created");
      setIsAuth(true);
      navigation.navigate("Login");
    },
    onError: () => alert("Error in creating account"),
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setImage(null);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
    setUserInfo({ ...userInfo, DateOfBirth: formattedDate });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
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
              Step {step} of {totalSteps}: Create your account
            </Text>

            <View style={styles.inputContainer}>
              {step === 1 && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your First name"
                    placeholderTextColor="rgba(30,30,30,0.27)"
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, FirstName: value })
                    }
                    value={userInfo.FirstName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Last name"
                    placeholderTextColor="rgba(30,30,30,0.27)"
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, LastName: value })
                    }
                    value={userInfo.LastName}
                  />
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {userInfo.DateOfBirth || "Select Date of Birth"}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && Platform.OS === "android" && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      onDateChange(event, selectedDate);
                    }}
                      maximumDate={new Date()}
                    />
                  )}
                  {showDatePicker && Platform.OS === "ios" && (
                  <View style={styles.iosPickerContainer}>
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      onChange={onDateChange}
                      maximumDate={new Date()}
                      style={styles.iosPicker}
                    />
                    <TouchableOpacity
                      style={styles.iosPickerButton}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={styles.iosPickerButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
              )}

              {step === 2 && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(30,30,30,0.27)"
                    keyboardType="email-address"
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, Email: value })
                    }
                    value={userInfo.Email}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Phone Number"
                    placeholderTextColor="rgba(30,30,30,0.27)"
                    keyboardType="phone-pad"
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, Phone: value })
                    }
                    value={userInfo.Phone}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(30,30,30,0.27)"
                    secureTextEntry
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, Password: value })
                    }
                    value={userInfo.Password}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="rgba(30,30,30,0.27)"
                    secureTextEntry
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, ConfirmPassword: value })
                    }
                    value={userInfo.ConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImage}
                  >
                    <Text style={styles.uploadButtonText}>
                      Upload Profile Image
                    </Text>
                  </TouchableOpacity>

                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={styles.profileImage}
                    />
                  )}
                </>
              )}
            </View>

            <View style={styles.buttonContainer}>
              {step > 1 && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#A0A0A0" }]}
                  onPress={handleBack}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              )}
              {step < totalSteps ? (
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: "#2F3039" },
                    step === 1 && { width: "100%" },
                  ]}
                  onPress={handleNext}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#2F3039" }]}
                  onPress={() => mutate()}
                >
                  <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  container: {
    flexGrow: 1,
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
    flexGrow: 1,
    backgroundColor: "White",
    maxWidth: Dimensions.get("window").width,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 85,
    paddingBottom: 20,
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
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E1E1E",
    lineHeight: 60,
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  iosPickerContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  iosPicker: {
    height: 200,
  },
  iosPickerButton: {
    padding: 16,
    backgroundColor: "#2F3039",
    alignItems: "center",
  },
  iosPickerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  uploadButton: {
    width: "100%",
    height: 60,
    backgroundColor: "#E0E0E0",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E1E1E",
  },
  profileImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  button: {
    width: "45%",
    height: 60,
    borderRadius: 39,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 120,
  },
  lottieAnimation: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default Register;
