import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const Step2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goalData } = route.params; // Data from (Step 1)

  const [isAutoDepositEnabled, setIsAutoDepositEnabled] = useState(false);
  const [depositFrequency, setDepositFrequency] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [customDepositIntervalDays, setCustomDepositIntervalDays] =
    useState("");
  const [frequencyMenuVisible, setFrequencyMenuVisible] = useState(false);
  const [frequencyError, setFrequencyError] = useState("");
  const [depositAmountError, setDepositAmountError] = useState("");
  const [customDayError, setCustomDayError] = useState("");

  // Map frontend "Quarterly" to backend "Custom" with 90 days
  const frequencyOptions = ["Weekly", "Monthly", "Quarterly"];
  const mapFrequencyToBackend = (frequency) => {
    if (frequency === "Quarterly") return { frequency: "Custom", days: "90" };
    return { frequency, days: null };
  };

  const animatedValue = useRef(
    new Animated.Value(isAutoDepositEnabled ? 1 : 0)
  ).current;
  const trackWidth = 50;
  const trackHeight = 24;
  const thumbSize = 16;
  const thumbTravel = trackWidth - thumbSize - 4;

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, thumbTravel],
  });

  const toggleSwitch = () => {
    const newValue = !isAutoDepositEnabled;
    setIsAutoDepositEnabled(newValue);
    setFrequencyError("");
    setDepositAmountError("");
    setCustomDayError("");
    Animated.spring(animatedValue, {
      toValue: newValue ? 1 : 0,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleFrequencyPress = () => {
    if (!isAutoDepositEnabled) {
      setFrequencyError(
        "Auto deposit must be enabled to select this frequency"
      );
    } else {
      setFrequencyError("");
      setFrequencyMenuVisible(!frequencyMenuVisible);
    }
  };

  const handleDepositAmountPress = () => {
    if (!isAutoDepositEnabled) {
      setDepositAmountError("Auto deposit must be enabled to enter an amount");
    } else {
      setDepositAmountError("");
    }
  };

  const handleCustomDayPress = () => {
    if (!isAutoDepositEnabled || depositFrequency !== "Quarterly") {
      setCustomDayError(
        depositFrequency !== "Quarterly"
          ? "Quarterly frequency must be selected to set custom days"
          : "Auto deposit must be enabled to set custom days"
      );
    } else {
      setCustomDayError("");
    }
  };

  const handleNext = () => {
    if (isAutoDepositEnabled) {
      if (!depositFrequency) {
        alert("Please select a deposit frequency");
        return;
      }
      if (
        !depositAmount ||
        isNaN(parseFloat(depositAmount)) ||
        parseFloat(depositAmount) <= 0
      ) {
        alert("Deposit amount must be a valid number greater than zero");
        return;
      }
      if (
        depositFrequency === "Quarterly" &&
        (!customDepositIntervalDays ||
          isNaN(parseInt(customDepositIntervalDays)) ||
          parseInt(customDepositIntervalDays) <= 0)
      ) {
        alert(
          "Custom deposit interval days must be a valid number greater than zero for Quarterly frequency"
        );
        return;
      }
    }

    const { frequency: backendFrequency, days } =
      mapFrequencyToBackend(depositFrequency);
    navigation.navigate("Step3Final", {
      goalData: {
        ...goalData,
        depositFrequency: isAutoDepositEnabled ? backendFrequency : null,
        depositAmount:
          isAutoDepositEnabled && depositAmount
            ? parseFloat(depositAmount)
            : null,
        customDepositIntervalDays:
          isAutoDepositEnabled &&
          (backendFrequency === "Custom"
            ? customDepositIntervalDays || days
            : null),
      },
    });
  };

  const isDepositAmountEditable = isAutoDepositEnabled;
  const isCustomDayEditable =
    isAutoDepositEnabled && depositFrequency === "Quarterly";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>{"Transaction details"}</Text>
        <View style={styles.form}>
          <View style={styles.field}>
            <View style={styles.row}>
              <Text style={styles.text2}>{"Auto-Deposit"}</Text>
              <Pressable onPress={toggleSwitch}>
                <View
                  style={[
                    styles.track,
                    {
                      width: trackWidth,
                      height: trackHeight,
                      backgroundColor: isAutoDepositEnabled
                        ? "rgb(9, 53, 101)"
                        : "#767577",
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.thumb,
                      {
                        width: thumbSize,
                        height: thumbSize,
                        transform: [{ translateX: thumbPosition }],
                        backgroundColor: isAutoDepositEnabled
                          ? "#f4f3f4"
                          : "#f4f3f4",
                      },
                    ]}
                  />
                </View>
              </Pressable>
            </View>
            <Text style={styles.text3}>
              {"Automatically transfer money into your goal."}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.text4}>
              {"How often would you like to save?"}
            </Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={[
                  styles.dropdown,
                  !isAutoDepositEnabled && styles.disabledInput,
                ]}
                onPress={handleFrequencyPress}
              >
                <Text style={styles.dropdownText}>
                  {depositFrequency || "Select frequency"}
                </Text>

                {isAutoDepositEnabled ? (
                  <Ionicons name="chevron-down" size={20} color="#000" />
                ) : (
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color="#888"
                    style={styles.lockIcon}
                  />
                )}
              </TouchableOpacity>
              {frequencyMenuVisible && isAutoDepositEnabled && (
                <View style={styles.dropdownMenu}>
                  {frequencyOptions.map((option, index) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.dropdownItem,
                        index === frequencyOptions.length - 1 &&
                          styles.lastDropdownItem,
                      ]}
                      onPress={() => {
                        setDepositFrequency(option);
                        setFrequencyMenuVisible(false);
                        setFrequencyError("");
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {frequencyError && (
              <Text style={styles.errorText}>{frequencyError}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{"Custom day"}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={"Every 90 Days"}
                value={customDepositIntervalDays}
                onChangeText={setCustomDepositIntervalDays}
                style={[
                  styles.input,
                  !isCustomDayEditable && styles.disabledInput,
                ]}
                keyboardType="numeric"
                editable={isCustomDayEditable}
                onFocus={handleCustomDayPress}
              />
              {!isCustomDayEditable && (
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="#888"
                  style={styles.lockIcon}
                />
              )}
            </View>
            {customDayError && (
              <Text style={styles.errorText}>{customDayError}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{"Deposit Amount"}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={"KWD"}
                placeholderTextColor="rgba(30,30,30,0.27)"
                value={depositAmount}
                onChangeText={setDepositAmount}
                style={[
                  styles.input,
                  !isDepositAmountEditable && styles.disabledInput,
                ]}
                keyboardType="numeric"
                editable={isDepositAmountEditable}
                onFocus={handleDepositAmountPress}
              />
              {!isDepositAmountEditable && (
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="#888"
                  style={styles.lockIcon}
                />
              )}
            </View>
            {depositAmountError && (
              <Text style={styles.errorText}>{depositAmountError}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.steps}>{"Step 2 of 3"}</Text>
        <View style={styles.progress}></View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.next}>{"Next"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    position: "absolute",
    top: 10,
    left: 16,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 16,
  },
  form: {
    gap: 30,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    gap: 10,
  },
  steps: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  progress: {
    height: 9,
    backgroundColor: "#D9D9D9",
    borderRadius: 51,
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: "#2E3039",
    borderRadius: 39,
    paddingVertical: 22,
  },
  track: {
    borderRadius: 12,
    marginLeft: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  thumb: {
    borderRadius: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 7,
    paddingVertical: 17,
    marginRight: 10,
  },
  button2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E1E1E1A",
    gap: 0,
    borderRadius: 7,
    paddingVertical: 17,
  },
  field: {
    gap: 2,
  },
  image: {
    width: 24,
    height: 24,
    marginTop: 57,
    marginBottom: 17,
    marginLeft: 16,
  },
  image2: {
    width: 40,
    height: 24,
  },
  input: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 17,
    paddingLeft: 17,
    paddingRight: 34,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  lockIcon: {
    position: "absolute",
    right: 10,
  },
  disabledInput: {
    opacity: 0.5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  row2: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 66,
  },
  text2: {
    color: "#1E1E1E",
    fontSize: 16,
    flex: 1,
  },
  text3: {
    color: "#757575",
    fontSize: 16,
  },
  text4: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 9,
  },
  text5: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 33,
  },
  text6: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 30,
  },
  text7: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 25,
  },
  label: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text9: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  text10: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  next: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  view: {
    flex: 1,
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 17,
    marginRight: 9,
  },
  view2: {
    flex: 1,
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 17,
  },
  view3: {
    alignItems: "center",
    marginBottom: 6,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 14,
    padding: 14,
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: "#1E1E1E",
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: "#EBE5EC",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1000,
    borderTopWidth: 2,
    borderTopColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    alignSelf: "center",
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
});
