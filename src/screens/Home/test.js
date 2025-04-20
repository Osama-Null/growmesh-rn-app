import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TestModal from "../../components/SavingsGoalDetails/TestModal";

const test = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleTestPress = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleTestPress} style={styles.btn}>
        <Text style={styles.txt}>Click me</Text>
      </TouchableOpacity>

      {/* Test Modal */}
      <TestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default test;

const styles = StyleSheet.create({
  btn: {
    height: 100,
    width: 100,
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 100,
    marginTop: 50
  },
  txt: {
    color: "white",
  },
});
