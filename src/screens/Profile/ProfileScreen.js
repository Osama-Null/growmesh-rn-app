import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, editProfile } from "../../api/user";
import Modal from "react-native-modal";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import UserContext from "../../context/UserContext";
import { deleteToken } from "../../api/storage";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "../../context/ThemeContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { setIsAuth } = useContext(UserContext);
  const { theme = "light", toggleTheme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    profilePicture: null,
  });
  const [originalProfile, setOriginalProfile] = useState(null);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
      setOriginalProfile(profileData);
      setSelectedImage(profileData.profilePicture);
    }
  }, [profileData]);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setIsImageChanged(true);
    }
  };

  const hasChanges = () => {
    if (!originalProfile) return false;
    return (
      profile.email !== originalProfile.email ||
      profile.phone !== originalProfile.phone ||
      isImageChanged
    );
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (hasChanges()) {
        Alert.alert(
          "Unsaved Changes",
          "You have unsaved changes. Are you sure you want to cancel?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Discard",
              onPress: () => {
                setProfile(originalProfile);
                setSelectedImage(originalProfile.profilePicture);
                setIsImageChanged(false);
                setIsEditing(false);
              },
            },
          ]
        );
      } else {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!hasChanges()) {
      Alert.alert("Info", "No changes to save");
      setIsEditing(false);
      return;
    }
    setIsPasswordModalVisible(true);
  };

  const updateProfileMutation = useMutation({
    mutationFn: ({ userInfo, image }) => editProfile(userInfo, image),
    onSuccess: (data) => {
      console.log("Profile updated:", data);
      queryClient.invalidateQueries(["profile"]);
      Alert.alert("Success", "Profile updated successfully");
      setIsEditing(false);
      setIsPasswordModalVisible(false);
      setPassword("");
      setIsImageChanged(false);
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.Errors?.[0] || "Failed to update profile";
      console.error("Update failed:", error);
      Alert.alert(
        "Error",
        errorMsg === "Invalid password" ? "Wrong password" : errorMsg
      );
      setPassword("");
    },
  });

  const handleConfirmPassword = () => {
    // Always include Email and Phone from profileData if not updated
    const userInfo = {
      Email: profile.email || originalProfile.email,
      Phone: profile.phone || originalProfile.phone,
      Password: password,
    };
    const image = isImageChanged ? selectedImage : null;

    console.log("Updating profile with:", { userInfo, image });
    updateProfileMutation.mutate({ userInfo, image });
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await deleteToken();
            setIsAuth(false);
          } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert("Error", "Failed to log out. Please try again.");
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2F3039" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: 50,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
            }}
            onPress={toggleTheme}
          >
            {theme === "light" ? (
              <MaterialIcons name="dark-mode" size={24} color="black" />
            ) : (
              <Entypo name="light-up" size={24} color="black" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
            }}
            onPress={() => navigation.navigate("Faq")}
          >
            <Text
              style={{
                color: "#2F3039",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              !
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "rgba(255, 0, 0, 0.08)",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
            }}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.profileImage}
              onError={() => setSelectedImage(null)}
            />
          ) : (
            <FontAwesome name="user-circle-o" size={80} color="black" />
          )}
          {isEditing && (
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleImagePick}
            >
              <Feather name="edit-3" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Non-editable fields */}
        <View style={styles.formSection}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.inputDisabled}
            value={profile.firstName}
            editable={false}
          />
        </View>
        <View style={styles.formSection}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.inputDisabled}
            value={profile.lastName}
            editable={false}
          />
        </View>
        <View style={styles.formSection}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.inputDisabled}
            value={new Date(profile.dateOfBirth).toLocaleDateString()}
            editable={false}
          />
        </View>

        {/* Editable fields */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profile.email}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, email: text }))
            }
            editable={isEditing}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formSection}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profile.phone}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, phone: text }))
            }
            editable={isEditing}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.bottomButtons}>
        {isEditing && (
          <TouchableOpacity
            style={styles.cancelEdit}
            onPress={() => handleEditToggle()}
          >
            <Text style={styles.cancelEditText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, isEditing && styles.saveButton]}
          onPress={isEditing ? handleSave : handleEditToggle}
        >
          <Text style={styles.actionButtonText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isPasswordModalVisible}
        onBackdropPress={() => setIsPasswordModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Password</Text>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            placeholderTextColor="rgba(30,30,30,0.5)"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmPassword}
            >
              <Text style={styles.confirmButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsPasswordModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  cancelEdit: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cancelEditText: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingHorizontal: 24,
    position: "absolute",
    top: 0,
    left: 0,
    gap: 20,
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 42,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 24,
    width: 130,
    height: 130,
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#2F3039",
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: -10,
    marginTop: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#1D1B20",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: "Roboto",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.39)",
  },
  inputDisabled: {
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: "Roboto",
  },
  bottomButtons: {
    padding: 24,
    backgroundColor: "#FEF7FF",
  },
  actionButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  modalContent: {
    backgroundColor: "#FEF7FF",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1D1B20",
    fontFamily: "Roboto",
  },
  passwordInput: {
    width: "100%",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1D1B20",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  confirmButton: {
    backgroundColor: "#2F3039",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#2F3039",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
});
