import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import CustomEmojiPicker from "../../components/CustomEmojiPicker";
import CustomColorPicker from "../../components/CustomColorPicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import DatePicker from "../../components/DatePicker";

const TimeBased = () => {
  const navigation = useNavigation();
  const [goalName, setGoalName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#2596be");
  const [hexInput, setHexInput] = useState("#2596be");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [targetDate, setTargetDate] = useState(new Date()); // Initialize with today's date
  // Error state for each field
  const [goalNameError, setGoalNameError] = useState("");
  const [targetDateError, setTargetDateError] = useState("");

  const handleColorSelected = (color) => {
    setSelectedColor(color);
    setHexInput(color);
  };

  const handleHexInputChange = (text) => {
    if (!text.startsWith("#")) {
      text = "#" + text;
    }
    if (text.length > 7) {
      text = text.slice(0, 7);
    }
    setHexInput(text);
    if (/^#[0-9A-Fa-f]{6}$/.test(text)) {
      setSelectedColor(text);
    }
  };

  const handleEmoji = () => {
    setModalVisible(true);
  };

  const handleEmojiSelected = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleDate = () => {
    setDateModalVisible(true);
  };

  const handleDateSelected = (formattedDate) => {
    const selectedDate = new Date(formattedDate);
    setTargetDate(selectedDate);
    setTargetDateError("");
  };

  const handleNext = () => {
    setGoalNameError("");
    setTargetDateError("");

    let hasError = false;

    if (!goalName) {
      setGoalNameError("Goal name is required");
      hasError = true;
    }

    if (!targetDate) {
      setTargetDateError("Target date is required");
      hasError = true;
    } else if (targetDate <= new Date()) {
      setTargetDateError("Target date must be in the future");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    navigation.navigate("Step2", {
      goalData: {
        savingsGoalName: goalName,
        targetDate: targetDate.toISOString(),
        description: description || null,
        emoji: selectedEmoji || null,
        color: selectedColor || null,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Time Based</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>{"What Are You Saving For?"}</Text>
        <View style={styles.form}>
          <View style={styles.field1}>
            <Text style={styles.label}>{"Goal name"}</Text>
            <TextInput
              placeholder={
                "e.g., New Laptop, Emergency Fund, Vacation to Russia"
              }
              value={goalName}
              onChangeText={(text) => {
                setGoalName(text);
                setGoalNameError("");
              }}
              style={styles.input}
              placeholderTextColor="rgba(30,30,30,0.27)"
            />
            {goalNameError ? (
              <Text style={styles.errorText}>{goalNameError}</Text>
            ) : null}
          </View>
          <View style={styles.field2}>
            <Text style={styles.label}>{"Target date"}</Text>
            <TouchableOpacity style={styles.input3} onPress={handleDate}>
              <Text style={{ fontSize: 16, color: "rgba(30,30,30,0.27)" }}>
                {targetDate
                  ? new Date(targetDate).toLocaleDateString("en-GB")
                  : "Select date"}
              </Text>
              <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>
            <DatePicker
              visible={dateModalVisible}
              onClose={() => setDateModalVisible(false)}
              initialDate={targetDate}
              onDateSelected={handleDateSelected}
              style={{ zIndex: 1000 }}
            />
            {targetDateError ? (
              <Text style={styles.errorText}>{targetDateError}</Text>
            ) : null}
          </View>
          <View style={styles.field3}>
            <Text style={styles.label}>{"Style & color"}</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.row2} onPress={handleEmoji}>
                <Text style={styles.text3}>{"Icon"}</Text>
                <View
                  style={{
                    height: 36,
                    width: 47,
                    borderWidth: 1,
                    borderColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: 14,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                  }}
                >
                  {selectedEmoji ? (
                    <Text style={{ fontSize: 24 }}>{selectedEmoji}</Text>
                  ) : (
                    <Entypo name="emoji-flirt" size={24} color="black" />
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.row3}>
                <TextInput
                  value={hexInput}
                  onChangeText={handleHexInputChange}
                  style={styles.text4}
                  maxLength={7}
                  placeholder="#2596be"
                />
                <TouchableOpacity
                  style={styles.row4}
                  onPress={() => setShowColorPicker(true)}
                >
                  <MaterialIcons name="colorize" size={30} color="black" />
                  <View
                    style={[styles.image4, { backgroundColor: selectedColor }]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.field4}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.inputD}
              placeholder={"Add description"}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              placeholderTextColor="rgba(30,30,30,0.27)"
            />
          </View>
        </View>
      </View>

      <CustomColorPicker
        visible={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        initialColor={selectedColor}
        onColorSelected={handleColorSelected}
      />

      <CustomEmojiPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectEmoji={handleEmojiSelected}
      />

      <View style={styles.footer}>
        <Text style={styles.steps}>{"Step 1 of 3"}</Text>
        <View style={styles.progress}></View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.next}>{"Next"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    position: "absolute",
    top: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 16,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    gap: 10,
  },
  backButton: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
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
  column: {
    marginBottom: 40,
    marginHorizontal: 16,
  },
  column2: {
    marginBottom: 45,
  },
  column3: {
    marginBottom: 24,
    marginHorizontal: 16,
  },
  image: {
    width: 24,
    height: 24,
    marginTop: 57,
    marginBottom: 18,
    marginLeft: 16,
  },
  image2: {
    borderRadius: 14,
    width: 47,
    height: 36,
  },
  image3: {
    borderRadius: 16,
    width: 33,
    height: 33,
    marginRight: 9,
  },
  image4: {
    borderRadius: 16,
    width: 36,
    height: 36,
  },
  input: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 22,
    paddingLeft: 15,
    paddingRight: 30,
  },
  input2: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 22,
    paddingLeft: 13,
    paddingRight: 26,
  },
  inputD: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1E1E1E",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    marginRight: 15,
    justifyContent: "space-between",
  },
  row3: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 9,
    paddingRight: 10,
    paddingLeft: 40,
    justifyContent: "space-between",
  },
  row4: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 3,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 41,
  },
  text3: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 26,
  },
  text4: {
    color: "#090909",
    fontSize: 16,
    marginRight: 26,
  },
  text5: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 1,
  },
  text6: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 14,
  },
  steps: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  next: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  view: {
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingTop: 22,
    paddingBottom: 98,
  },
  field1: {
    width: "100%",
  },
  field2: {
    width: "100%",
  },
  field3: {
    width: "100%",
  },
  field4: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#2E3039",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    gap: 30,
  },
  input3: {
    justifyContent: "space-between",
    flexDirection: "row",
    color: "#1E1E1E",
    backgroundColor: "#1E1E1E1A",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
});

export default TimeBased;
