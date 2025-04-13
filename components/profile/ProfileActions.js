import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

const ProfileActions = ({ onEditPress, onLogout }) => (
  <View style={styles.actionsContainer}>
    <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
      <Text style={styles.editButtonText}>Edit Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  actionsContainer: {
    gap: 16,
    marginTop: 32,
  },
  editButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily:  "Roboto",
  },
  logoutButton: {
    backgroundColor: "rgba(216, 105, 107, 0.1)",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#D8696B",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default ProfileActions;
