// import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";

// const TestModal = ({ visible, onClose }) => {
//   const handleClose = () => {
//     onClose();
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           {/* Close Button */}
//           <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
//             <Ionicons
//               name="close"
//               size={28}
//               color="white"
//               paddingBottom="10"
//             />
//           </TouchableOpacity>

//           <View style={{}}>
//             <Text style={styles.txt}>I'm Working!</Text>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default TestModal;

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "rgba(0, 0, 0, 0.66)",
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     height: 400
//   },
//   closeButton: {
//     alignSelf: "flex-end",
//   },
//   txt:{
//     color:"white",
//     fontSize: 20,
//     alignSelf:"center",
//     paddingTop: 20
//   }
// });
