import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

const EditSavingsGoal = () => {
  const [textInput1, onChangeTextInput1] = useState("");
  const [textInput2, onChangeTextInput2] = useState("");
  const [textInput3, onChangeTextInput3] = useState("");
  const [textInput4, onChangeTextInput4] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      {/* Icon container */}
      <View>
        {/* circle with colored border*/}
        <View>
          {/* icon */}
          <View></View>
        </View>
        {/* floating edit icon */}
        <View></View>
      </View>

      {/* Fields container */}
      <View>
        {/* raw 1 */}
        <View>
          {/* name */}
          <View>
            <Text>Name</Text>
            <TextInput />
          </View>
          {/* date */}
          <View>
            <Text>Target Date</Text>
            <TextInput />
          </View>
        </View>

        {/* raw 2 */}
        <View>
          {/* freq */}
          <View></View>
          {/* days */}
          <View></View>
        </View>

        {/* raw 3 */}
        <View>
          {/* freq */}
          <View></View>
        </View>
      </View>

      {/* Action container */}
      <View></View>
    </SafeAreaView>
  );
};

export default EditSavingsGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
});
