import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Shadow } from "react-native-shadow-2";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Get screen width for dynamic sizing
const { width } = Dimensions.get("window");

const AddGoal = () => {
  const navigation = useNavigation();
  const [selectedColumn, setSelectedColumn] = useState(null); // Track selected column ('amount' or 'time')

  const handleColumnPress = (type) => {
    setSelectedColumn(type); // Set the selected column
  };

  const handleNextPress = () => {
    if (selectedColumn === "amount") {
      navigation.navigate("AmountBased");
    } else if (selectedColumn === "time") {
      navigation.navigate("TimeBased");
    } else {
      alert("Please select a savings goal type.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{"CHOOSE HOW YOU WANT TO SAVE"}</Text>
        <TouchableOpacity onPress={() => handleColumnPress("amount")}>
          <Shadow
            distance={6}
            startColor="#00000020"
            offset={[0, 3]}
            containerViewProps={{
              style: {
                marginBottom: 26,
                marginHorizontal: 16,
              },
            }}
          >
            <View
              style={[
                styles.column,
                selectedColumn === "amount" && styles.selectedColumn, // Highlight if selected
              ]}
            >
              <LottieView
                source={require("../../../assets/app/amountbased.json")}
                autoPlay
                loop
                width={200}
                height={200}
                style={{
                  position: "absolute",
                  right: 20,
                  bottom: 80,
                }}
              />
              <Text
                style={[
                  styles.text2,
                  selectedColumn === "amount" && styles.selectedText, // White text if selected
                ]}
              >
                {"Save Until an Amount"}
              </Text>
              <Text
                style={[
                  styles.text3,
                  selectedColumn === "amount" && styles.selectedText, // White text if selected
                ]}
              >
                {"Set a target amount to reach."}
              </Text>
            </View>
          </Shadow>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColumnPress("time")}>
          <Shadow
            distance={6}
            startColor="#00000020"
            offset={[0, 3]}
            containerViewProps={{
              style: {
                marginBottom: 29,
                marginHorizontal: 16,
              },
            }}
          >
            <View
              style={[
                styles.column2,
                selectedColumn === "time" && styles.selectedColumn, // Highlight if selected
              ]}
            >
              <LottieView
                source={require("../../../assets/app/timebased.json")}
                autoPlay
                loop
                width={150}
                height={150}
                style={{
                  position: "absolute",
                  left: 30,
                  bottom: 80,
                }}
              />
              <View style={styles.view}>
                <Text
                  style={[
                    styles.text4,
                    selectedColumn === "time" && styles.selectedText, // White text if selected
                  ]}
                >
                  {"Save Until a Date"}
                </Text>
              </View>
              <Text
                style={[
                  styles.text3,
                  selectedColumn === "time" && styles.selectedText, // White text if selected
                ]}
              >
                {"Set an end date for your goal."}
              </Text>
            </View>
          </Shadow>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.footer}
        onPress={handleNextPress} // Navigate based on selection
      >
        <Text style={styles.text5}>{"Next"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    position: "absolute", // <-- stay outside normal layout flow
    top: 10, // <-- distance from the top of the screen
    left: 16, // <-- distance from the left of the screen
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    marginTop: 60,
  },
  footer: {
    position: "absolute", // <-- important
    bottom: 20, // <-- distance from bottom
    left: 20,
    right: 20,
    backgroundColor: "#2F3039",
    borderRadius: 39,
    paddingVertical: 22,
    alignItems: "center",
    maxWidth: 380,
    alignSelf: "center",
  },
  column: {
    backgroundColor: "#1E1E1E1A",
    borderRadius: 13,
    paddingTop: 93,
    paddingBottom: 41,
    width: width - 32,
    
  },
  column2: {
    backgroundColor: "#1E1E1E1A",
    borderRadius: 13,
    paddingTop: 94,
    paddingBottom: 40,
    width: width - 32,
  },
  selectedColumn: {
    backgroundColor: "rgba(9, 53, 101, 1)", // Highlight color when selected
  },
  selectedText: {
    color: "#FFFFFF", // White text when column is selected
  },
  image: {
    width: 24,
    height: 24,
    marginTop: 10,
    marginBottom: 14,
    marginLeft: 16,
  },
  text: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 40,
    marginHorizontal: 16,
  },
  text2: {
    color: "#000000",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 80,
    marginLeft: 17,
    width: 158,
  },
  text3: {
    color: "#000000",
    fontSize: 16,
    marginLeft: 16,
  },
  text4: {
    color: "#000000",
    fontSize: 26,
    fontWeight: "bold",
    marginRight: 37,
    width: 143,
  },
  text5: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  view: {
    alignItems: "flex-end",
    marginBottom: 80,
  },
});
