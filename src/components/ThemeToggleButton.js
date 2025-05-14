import { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme}>
      {theme === "light" ? (
        <MaterialIcons name="dark-mode" size={24} color="black" />
      ) : (
        <Entypo name="light-up" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;

const styles = StyleSheet.create({});
