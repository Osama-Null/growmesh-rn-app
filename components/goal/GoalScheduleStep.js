// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import LottieView from "lottie-react-native";

// const frequencies = [
//   { id: 1, title: "Weekly", value: "Weekly" },
//   { id: 2, title: "Monthly", value: "Monthly" },
//   { id: 3, title: "Quarterly", value: "Quarterly" },
// ];

// const GoalScheduleStep = ({ onBack, goalType, amount, description, onSubmit }) => {
//   const [selectedFrequency, setSelectedFrequency] = useState("monthly");
//   const [contribution, setContribution] = useState("");
//   const [makeInitialPayment, setMakeInitialPayment] = useState(null);
//   const [initialPayment, setInitialPayment] = useState("");
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleComplete = () => {
//     setIsAnimating(true);
//     setTimeout(() => {
//       setIsAnimating(false);
//       onSubmit({
//         goalType,
//         amount,
//         description,
//         frequency: selectedFrequency,
//         contribution,
//         initialPayment: makeInitialPayment ? initialPayment : "0",
//       });
//     }, 2500);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.content}>
//         <Text style={styles.title}>How often would you like to save?</Text>

//         <View style={styles.frequencyContainer}>
//           {frequencies.map((freq) => (
//             <TouchableOpacity
//               key={freq.id}
//               style={[
//                 styles.frequencyOption,
//                 selectedFrequency === freq.value && styles.selectedFrequency,
//               ]}
//               onPress={() => setSelectedFrequency(freq.value)}
//             >
//               <Text
//                 style={[
//                   styles.frequencyText,
//                   selectedFrequency === freq.value && styles.selectedFrequencyText,
//                 ]}
//               >
//                 {freq.title}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Contribution Amount</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="KWD 0.000"
//             value={contribution}
//             onChangeText={setContribution}
//             keyboardType="numeric"
//             placeholderTextColor="#1e1e1e80"
//           />
//         </View>

//         <View style={styles.initialPaymentContainer}>
//           <Text style={styles.label}>
//             Do you want to make first payment today?
//           </Text>
//           <View style={styles.optionsContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.optionButton,
//                 makeInitialPayment === true && styles.selectedOption,
//               ]}
//               onPress={() => {
//                 setMakeInitialPayment(true);
//                 setInitialPayment("");
//               }}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   makeInitialPayment === true && styles.selectedOptionText,
//                 ]}
//               >
//                 Yes
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.optionButton,
//                 makeInitialPayment === false && styles.selectedOption,
//               ]}
//               onPress={() => {
//                 setMakeInitialPayment(false);
//                 setInitialPayment("0");
//               }}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   makeInitialPayment === false && styles.selectedOptionText,
//                 ]}
//               >
//                 No
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {makeInitialPayment && (
//             <View style={styles.initialPaymentInputContainer}>
//               <Text style={styles.label}>Initial Payment Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="KWD 0.000"
//                 value={initialPayment}
//                 onChangeText={setInitialPayment}
//                 keyboardType="numeric"
//                 placeholderTextColor="#1e1e1e80"
//               />
//             </View>
//           )}
//         </View>

//         <View style={styles.summaryContainer}>
//           <Text style={styles.summaryTitle}>Summary</Text>
//           <View style={styles.summaryItem}>
//             <Text style={styles.summaryLabel}>Goal Type</Text>
//             <Text style={styles.summaryValue}>{goalType}</Text>
//           </View>
//           <View style={styles.summaryItem}>
//             <Text style={styles.summaryLabel}>Target Amount</Text>
//             <Text style={styles.summaryValue}>KWD {amount}</Text>
//           </View>
//           <View style={styles.summaryItem}>
//             <Text style={styles.summaryLabel}>Frequency</Text>
//             <Text style={styles.summaryValue}>
//               {selectedFrequency.charAt(0).toUpperCase() + selectedFrequency.slice(1)}
//             </Text>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: "#A0A0A0" }]}
//           onPress={onBack}
//         >
//           <Text style={styles.buttonText}>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: "#2F3039" }]}
//           onPress={handleComplete}
//         >
//           <Text style={styles.buttonText}>Complete Setup</Text>
//         </TouchableOpacity>
//       </View>

//       {isAnimating && (
//         <View style={styles.animationContainer}>
//           <LottieView
//             source={require("../../assets/confetti.json")}
//             autoPlay
//             loop={false}
//             style={styles.animation}
//             speed={0.5}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#000",
//     marginBottom: 24,
//     fontFamily: "Roboto",
//   },
//   frequencyContainer: {
//     flexDirection: "row",
//     gap: 12,
//     marginBottom: 32,
//   },
//   frequencyOption: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.5)",
//     borderRadius: 14,
//     padding: 16,
//     alignItems: "center",
//   },
//   selectedFrequency: {
//     backgroundColor: "#2F3039",
//   },
//   frequencyText: {
//     fontSize: 16,
//     color: "#000",
//     fontFamily: "Roboto",
//   },
//   selectedFrequencyText: {
//     color: "#FFF",
//   },
//   inputGroup: {
//     gap: 8,
//     marginBottom: 32,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//     fontFamily: "Roboto",
//   },
//   input: {
//     backgroundColor: "rgba(255,255,255,0.5)",
//     borderRadius: 14,
//     padding: 16,
//     fontSize: 16,
//     color: "#1e1e1e",
//     fontFamily: "Roboto",
//   },
//   initialPaymentContainer: {
//     marginTop: 24,
//     gap: 12,
//   },
//   optionsContainer: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   optionButton: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.5)",
//     borderRadius: 14,
//     padding: 16,
//     alignItems: "center",
//   },
//   selectedOption: {
//     backgroundColor: "#2F3039",
//   },
//   optionText: {
//     fontSize: 16,
//     color: "#000",
//     fontFamily: "Roboto",
//   },
//   selectedOptionText: {
//     color: "#FFF",
//   },
//   initialPaymentInputContainer: {
//     marginTop: 16,
//     gap: 8,
//   },
//   summaryContainer: {
//     backgroundColor: "rgba(255,255,255,0.5)",
//     borderRadius: 14,
//     padding: 16,
//     gap: 16,
//     marginTop: 32,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#000",
//     marginBottom: 8,
//     fontFamily: "Roboto",
//   },
//   summaryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   summaryLabel: {
//     fontSize: 16,
//     color: "#1e1e1e80",
//     fontFamily: "Roboto",
//   },
//   summaryValue: {
//     fontSize: 16,
//     color: "#000",
//     fontWeight: "500",
//     fontFamily: "Roboto",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//   },
//   button: {
//     width: "45%",
//     borderRadius: 39,
//     paddingVertical: 16,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "700",
//     fontFamily: "Roboto",
//   },
//   animationContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(254, 247, 255, 0.9)",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 9999,
//   },
//   animation: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// export default GoalScheduleStep;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

const frequencies = [
  { id: 1, title: "Weekly", value: "Weekly" },
  { id: 2, title: "Monthly", value: "Monthly" },
  { id: 3, title: "Custom", value: "Custom" },
];

const GoalScheduleStep = ({ onBack, goalType, amount, description, onSubmit }) => {
  const [selectedFrequency, setSelectedFrequency] = useState("Monthly");
  const [contribution, setContribution] = useState("");
  const [makeInitialPayment, setMakeInitialPayment] = useState(null);
  const [initialPayment, setInitialPayment] = useState("");
  const [customIntervalDays, setCustomIntervalDays] = useState("");
  const [error, setError] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleComplete = () => {
    // Validate contribution and frequency
    const contributionValue = parseFloat(contribution);
    if (contribution) {
      if (!contributionValue || contributionValue <= 0) {
        setError("Contribution amount must be greater than zero.");
        return;
      }
      if (!selectedFrequency) {
        setError("Please select a deposit frequency.");
        return;
      }
      if (selectedFrequency === "Custom") {
        const intervalDays = parseInt(customIntervalDays);
        if (!customIntervalDays || intervalDays <= 0) {
          setError("Custom deposit interval must be greater than zero.");
          return;
        }
      }
    }

    // Validate initial payment
    const initialPaymentValue = parseFloat(initialPayment);
    if (makeInitialPayment && (!initialPayment || initialPaymentValue <= 0)) {
      setError("Initial payment amount must be greater than zero.");
      return;
    }

    setError("");
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onSubmit({
        goalType,
        amount,
        description,
        frequency: contribution ? selectedFrequency : null,
        contribution: contribution || "0",
        initialPayment: makeInitialPayment ? initialPayment : "0",
        customIntervalDays: selectedFrequency === "Custom" ? customIntervalDays : null,
      });
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>How often would you like to save?</Text>

        <View style={styles.frequencyContainer}>
          {frequencies.map((freq) => (
            <TouchableOpacity
              key={freq.id}
              style={[
                styles.frequencyOption,
                selectedFrequency === freq.value && styles.selectedFrequency,
              ]}
              onPress={() => {
                setSelectedFrequency(freq.value);
                setError("");
              }}
            >
              <Text
                style={[
                  styles.frequencyText,
                  selectedFrequency === freq.value && styles.selectedFrequencyText,
                ]}
              >
                {freq.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contribution Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="KWD 0.000"
            value={contribution}
            onChangeText={(text) => {
              setContribution(text);
              setError("");
            }}
            keyboardType="numeric"
            placeholderTextColor="#1e1e1e80"
          />
        </View>

        {selectedFrequency === "Custom" && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Custom Interval (Days)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number of days"
              value={customIntervalDays}
              onChangeText={(text) => {
                setCustomIntervalDays(text);
                setError("");
              }}
              keyboardType="numeric"
              placeholderTextColor="#1e1e1e80"
            />
          </View>
        )}

        <View style={styles.initialPaymentContainer}>
          <Text style={styles.label}>
            Do you want to make first payment today?
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                makeInitialPayment === true && styles.selectedOption,
              ]}
              onPress={() => {
                setMakeInitialPayment(true);
                setInitialPayment("");
                setError("");
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  makeInitialPayment === true && styles.selectedOptionText,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                makeInitialPayment === false && styles.selectedOption,
              ]}
              onPress={() => {
                setMakeInitialPayment(false);
                setInitialPayment("0");
                setError("");
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  makeInitialPayment === false && styles.selectedOptionText,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>

          {makeInitialPayment && (
            <View style={styles.initialPaymentInputContainer}>
              <Text style={styles.label}>Initial Payment Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="KWD 0.000"
                value={initialPayment}
                onChangeText={(text) => {
                  setInitialPayment(text);
                  setError("");
                }}
                keyboardType="numeric"
                placeholderTextColor="#1e1e1e80"
              />
            </View>
          )}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Goal Type</Text>
            <Text style={styles.summaryValue}>{goalType}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Target Amount</Text>
            <Text style={styles.summaryValue}>KWD {amount}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Frequency</Text>
            <Text style={styles.summaryValue}>
              {contribution ? selectedFrequency : "None"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#A0A0A0" }]}
          onPress={onBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2F3039" }]}
          onPress={handleComplete}
        >
          <Text style={styles.buttonText}>Complete Setup</Text>
        </TouchableOpacity>
      </View>

      {isAnimating && (
        <View style={styles.animationContainer}>
          <LottieView
           source={require("../../assets/confetti.json")}
autoPlay
            loop={false}
            style={styles.animation}
            speed={0.5}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 24,
    fontFamily: "Roboto",
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  frequencyOption: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  selectedFrequency: {
    backgroundColor: "#2F3039",
  },
  frequencyText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Roboto",
  },
  selectedFrequencyText: {
    color: "#FFF",
  },
  inputGroup: {
    gap: 8,
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    fontFamily: "Roboto",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1e1e1e",
    fontFamily: "Roboto",
  },
  initialPaymentContainer: {
    marginTop: 24,
    gap: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#2F3039",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Roboto",
  },
  selectedOptionText: {
    color: "#FFF",
  },
  initialPaymentInputContainer: {
    marginTop: 16,
    gap: 8,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  summaryContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    gap: 16,
    marginTop: 32,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
    color: "#1e1e1e80",
    fontFamily: "Roboto",
  },
  summaryValue: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  button: {
    width: "45%",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  animationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(254, 247, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  animation: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default GoalScheduleStep;