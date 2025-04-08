// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Platform,
//   Dimensions,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");

// const NewGoal = () => {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     targetAmount: "",
//     transactionType: "Automatic",
//     monthlyAmount: "",
//   });

//   const handleSave = () => {
//     // Handle save logic here
//     console.log("Saving goal:", formData);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.backButton}
//           >
//             <Text style={styles.backButtonText}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Create your goal</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter goal name"
//               value={formData.name}
//               onChangeText={(text) => setFormData({ ...formData, name: text })}
//               placeholderTextColor="#1e1e1e80"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Description</Text>
//             <TextInput
//               style={[styles.input, styles.textArea]}
//               placeholder="Enter goal description"
//               value={formData.description}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, description: text })
//               }
//               multiline
//               numberOfLines={4}
//               placeholderTextColor="#1e1e1e80"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Target amount</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="KWD 0.000"
//               value={formData.targetAmount}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, targetAmount: text })
//               }
//               keyboardType="numeric"
//               placeholderTextColor="#1e1e1e80"
//             />
//           </View>

//           <View style={styles.row}>
//             <View style={styles.column}>
//               <Text style={styles.label}>Transaction Type</Text>
//               <TouchableOpacity style={styles.selectButton}>
//                 <Text style={styles.selectButtonText}>Automatic</Text>
//                 <Text style={styles.selectButtonIcon}>▼</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.column}>
//               <Text style={styles.label}>Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="KWD 0.000 / mo"
//                 value={formData.monthlyAmount}
//                 onChangeText={(text) =>
//                   setFormData({ ...formData, monthlyAmount: text })
//                 }
//                 keyboardType="numeric"
//                 placeholderTextColor="#1e1e1e80"
//               />
//             </View>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>


//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FEF7FF",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(0,0,0,0.1)",
//   },
//   backButton: {
//     padding: 8,
//   },
//   backButtonText: {
//     fontSize: 24,
//     color: "#000",
//   },
//   headerTitle: {
//     marginLeft: 12,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//     fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
//   },
//   formContainer: {
//     padding: 16,
//     gap: 24,
//   },
//   inputGroup: {
//     gap: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//     fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
//   },
//   input: {
//     borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.5)",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     fontSize: 16,
//     color: "#1e1e1e",
//     fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
//     width: "100%",
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: "top",
//   },
//   row: {
//     flexDirection: "row",
//     gap: 20,
//     marginTop: 24,
//   },
//   column: {
//     flex: 1,
//     gap: 8,
//   },
//   selectButton: {
//     borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.5)",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   selectButtonText: {
//     fontSize: 16,
//     color: "#1e1e1e",
//     fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
//   },
//   selectButtonIcon: {
//     fontSize: 12,
//     color: "#1e1e1e",
//   },
//   saveButton: {
//     backgroundColor: "#2F3039",
//     borderRadius: 39,
//     marginHorizontal: 16,
//     marginTop: 40,
//     paddingVertical: 20,
//     alignItems: "center",
//   },
//   saveButtonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "700",
//     fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
//   },
//   gestureBar: {
//     height: 24,
//     backgroundColor: "#F3EDF7",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },
//   gestureBarHandle: {
//     width: 108,
//     height: 4,
//     backgroundColor: "#1D1B20",
//     borderRadius: 12,
//   },
// });

// export default NewGoal;