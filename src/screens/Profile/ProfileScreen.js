import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
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

// Light theme styles
const lightStyles = StyleSheet.create({
  // Main container
  profileScreenContainer: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  // Header section
  profileHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
    gap: 20,
  },
  profileHeaderBtnWrapper: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },
  // Back button
  profileBackBtn: {
    width: 24,
  },
  // Theme toggle button
  profileThemeToggleBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  // FAQ button
  profileFaqBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  profileFaqBtnTxt: {
    color: "#2F3039",
    fontSize: 24,
    fontWeight: "bold",
  },
  // Logout button
  profileLogoutBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 0, 0, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  // Content section
  profileContentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 42,
  },
  // Profile image
  profileImageWrapper: {
    alignItems: "center",
    marginBottom: 24,
    width: 130,
    height: 130,
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#2F3039",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 65,
  },
  // Change photo button
  profileChangePhotoBtn: {
    position: "absolute",
    bottom: 0,
    right: -10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  // Form sections
  profileFormSection: {
    marginBottom: 24,
  },
  profileFormLabel: {
    fontSize: 14,
    color: "#1D1B20",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  profileFormInput: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: "Roboto",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.39)",
  },
  profileFormInputDisabled: {
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: "Roboto",
  },
  // Bottom buttons
  profileBottomButtonsWrapper: {
    padding: 24,
    backgroundColor: "#FEF7FF",
  },
  profileCancelEditBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileCancelEditBtnTxt: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  profileEditBtn: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  profileSaveBtn: {
    backgroundColor: "#4CAF50",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  profileEditBtnTxt: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  profileSaveBtnTxt: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  // Password modal
  passwordModalContent: {
    backgroundColor: "#FEF7FF",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  passwordModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1D1B20",
    fontFamily: "Roboto",
  },
  passwordModalInput: {
    width: "100%",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1D1B20",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  passwordModalErrorTxt: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  passwordModalButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  passwordModalCancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordModalCancelBtnTxt: {
    color: "#2F3039",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  passwordModalConfirmBtn: {
    backgroundColor: "#2F3039",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordModalConfirmBtnTxt: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  // Notification popup
  popUpOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  popUpContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    height: "20%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  popUpMessageTxt: {
    fontSize: 18,
    color: "#1E1E1E",
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  popUpButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  // Unsaved changes popup buttons
  popUpUnsavedCancelBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpUnsavedCancelBtnTxt: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  popUpUnsavedDiscardBtn: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpUnsavedDiscardBtnTxt: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  // No changes popup button
  popUpNoChangesOkBtn: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpNoChangesOkBtnTxt: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  // Success popup button
  popUpSuccessOkBtn: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpSuccessOkBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  // Error popup button
  popUpErrorOkBtn: {
    backgroundColor: "#FF4444",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpErrorOkBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  // Logout popup buttons
  popUpLogoutCancelBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpLogoutCancelBtnTxt: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  popUpLogoutConfirmBtn: {
    backgroundColor: "#DC2626",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpLogoutConfirmBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

// Dark theme styles
const darkStyles = StyleSheet.create({
  // Main container
  profileScreenContainer: {
    flex: 1,
    backgroundColor: "#292848",
  },
  // Header section
  profileHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
    gap: 20,
  },
  profileHeaderBtnWrapper: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },
  // Back button
  profileBackBtn: {
    width: 24,
  },
  // Theme toggle button
  profileThemeToggleBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  // FAQ button
  profileFaqBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  profileFaqBtnTxt: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  // Logout button
  profileLogoutBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 0, 0, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  // Content section
  profileContentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 42,
  },
  // Profile image
  profileImageWrapper: {
    alignItems: "center",
    marginBottom: 24,
    width: 130,
    height: 130,
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 65,
  },
  // Change photo button
  profileChangePhotoBtn: {
    position: "absolute",
    bottom: 0,
    right: -10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  // Form sections
  profileFormSection: {
    marginBottom: 24,
  },
  profileFormLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  profileFormInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Roboto",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.39)",
  },
  profileFormInputDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  // Bottom buttons
  profileBottomButtonsWrapper: {
    padding: 24,
    backgroundColor: "#292848",
  },
  profileCancelEditBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileCancelEditBtnTxt: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  profileEditBtn: {
    backgroundColor: "#555555",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  profileSaveBtn: {
    backgroundColor: "#4CAF50",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
  },
  profileEditBtnTxt: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  profileSaveBtnTxt: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  // Password modal
  passwordModalContent: {
    backgroundColor: "#292848",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  passwordModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  passwordModalInput: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  passwordModalErrorTxt: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  passwordModalButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  passwordModalCancelBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordModalCancelBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  passwordModalConfirmBtn: {
    backgroundColor: "#555555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordModalConfirmBtnTxt: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  // Notification popup
  popUpOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popUpContent: {
    backgroundColor: "#292848",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    height: "20%",
  },
  popUpMessageTxt: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  popUpButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  // Unsaved changes popup buttons
  popUpUnsavedCancelBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpUnsavedCancelBtnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  popUpUnsavedDiscardBtn: {
    backgroundColor: "#555555",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpUnsavedDiscardBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  // No changes popup button
  popUpNoChangesOkBtn: {
    backgroundColor: "#555555",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpNoChangesOkBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  // Success popup button
  popUpSuccessOkBtn: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpSuccessOkBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  // Error popup button
  popUpErrorOkBtn: {
    backgroundColor: "#FF4444",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpErrorOkBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  // Logout popup buttons
  popUpLogoutCancelBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpLogoutCancelBtnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  popUpLogoutConfirmBtn: {
    backgroundColor: "#DC2626",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: "center",
    flex: 1,
  },
  popUpLogoutConfirmBtnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

const ProfileScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { setIsAuth } = useContext(UserContext);
  const { theme = "light", toggleTheme } = useTheme();

  const styles = theme === "light" ? lightStyles : darkStyles;

  const iconColor = theme === "light" ? "black" : "white";
  const buttonBackground =
    theme === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)";
  const faqTextColor = theme === "light" ? "#2F3039" : "#FFFFFF";

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
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
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationAction, setNotificationAction] = useState(null);

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
        setNotificationType("unsaved");
        setNotificationMessage(
          "You have unsaved changes. Are you sure you want to cancel?"
        );
        setNotificationAction(() => () => {
          setProfile(originalProfile);
          setSelectedImage(originalProfile.profilePicture);
          setIsImageChanged(false);
          setIsEditing(false);
        });
        setNotificationVisible(true);
      } else {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!hasChanges()) {
      setNotificationType("noChanges");
      setNotificationMessage("No changes to save");
      setNotificationAction(() => () => {
        setIsEditing(false);
      });
      setNotificationVisible(true);
      return;
    }
    setIsPasswordModalVisible(true);
  };

  const updateProfileMutation = useMutation({
    mutationFn: ({ userInfo, image }) => editProfile(userInfo, image),
    onSuccess: (data) => {
      console.log("Profile updated:", data);
      queryClient.invalidateQueries(["profile"]);
      setNotificationType("success");
      setNotificationMessage("Profile updated successfully");
      setNotificationAction(() => () => {
        setIsEditing(false);
        setIsPasswordModalVisible(false);
        setPassword("");
        setIsImageChanged(false);
      });
      setNotificationVisible(true);
    },
    onError: (error) => {
      console.error("Update failed:", error);
      if (error.response?.status === 400) {
        setPasswordError("Invalid password. Please try again.");
      } else {
        setPasswordError("Failed to update profile. Please try again later.");
      }
      setPassword("");
    },
  });

  const handleConfirmPassword = () => {
    if (!password.trim()) {
      setPasswordError("Please enter your password to proceed.");
      return;
    }

    setPasswordError("");

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
    setNotificationType("logout");
    setNotificationMessage("Are you sure you want to log out?");
    setNotificationAction(() => async () => {
      try {
        await deleteToken();
        setIsAuth(false);
      } catch (error) {
        console.error("Error during logout:", error);
        setNotificationType("error");
        setNotificationMessage("Failed to log out. Please try again.");
        setNotificationAction(null);
        setNotificationVisible(true);
      }
    });
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
    setNotificationType("");
    setNotificationMessage("");
    setNotificationAction(null);
  };

  const handleNotificationAction = () => {
    if (notificationAction) {
      notificationAction();
    }
    handleCloseNotification();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.profileScreenContainer}>
        <ActivityIndicator size="large" color={iconColor} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.profileScreenContainer}>
      <View style={styles.profileHeaderWrapper}>
        <TouchableOpacity
          style={styles.profileBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <View style={styles.profileHeaderBtnWrapper}>
          <TouchableOpacity
            style={styles.profileThemeToggleBtn}
            onPress={toggleTheme}
          >
            {theme === "light" ? (
              <MaterialIcons name="dark-mode" size={24} color={iconColor} />
            ) : (
              <Entypo name="light-up" size={24} color={iconColor} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileFaqBtn}
            onPress={() => navigation.navigate("Faq")}
          >
            <Text style={styles.profileFaqBtnTxt}>!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileLogoutBtn}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileContentWrapper}>
        <View style={styles.profileImageWrapper}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.profileImage}
              onError={() => setSelectedImage(null)}
            />
          ) : (
            <FontAwesome name="user-circle-o" size={100} color={iconColor} />
          )}
          {isEditing && (
            <TouchableOpacity
              style={styles.profileChangePhotoBtn}
              onPress={handleImagePick}
            >
              {theme === "light" ? (
                <Feather name="edit-3" size={24} color="white" />
              ) : (
                <Feather name="edit-3" size={24} color="black" />
              )}
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.profileFormSection}>
          <Text style={styles.profileFormLabel}>First Name</Text>
          <TextInput
            style={styles.profileFormInputDisabled}
            value={profile.firstName}
            editable={false}
          />
        </View>
        <View style={styles.profileFormSection}>
          <Text style={styles.profileFormLabel}>Last Name</Text>
          <TextInput
            style={styles.profileFormInputDisabled}
            value={profile.lastName}
            editable={false}
          />
        </View>
        <View style={styles.profileFormSection}>
          <Text style={styles.profileFormLabel}>Date of Birth</Text>
          <TextInput
            style={styles.profileFormInputDisabled}
            value={new Date(profile.dateOfBirth).toLocaleDateString()}
            editable={false}
          />
        </View>

        <View style={styles.profileFormSection}>
          <Text style={styles.profileFormLabel}>Email</Text>
          <TextInput
            style={[
              styles.profileFormInput,
              !isEditing && styles.profileFormInputDisabled,
            ]}
            value={profile.email}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, email: text }))
            }
            editable={isEditing}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.profileFormSection}>
          <Text style={styles.profileFormLabel}>Phone</Text>
          <TextInput
            style={[
              styles.profileFormInput,
              !isEditing && styles.profileFormInputDisabled,
            ]}
            value={profile.phone}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, phone: text }))
            }
            editable={isEditing}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.profileBottomButtonsWrapper}>
        {isEditing && (
          <TouchableOpacity
            style={styles.profileCancelEditBtn}
            onPress={() => handleEditToggle()}
          >
            <Text style={styles.profileCancelEditBtnTxt}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={isEditing ? styles.profileSaveBtn : styles.profileEditBtn}
          onPress={isEditing ? handleSave : handleEditToggle}
        >
          <Text
            style={
              isEditing ? styles.profileSaveBtnTxt : styles.profileEditBtnTxt
            }
          >
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isPasswordModalVisible}
        onBackdropPress={() => {
          setIsPasswordModalVisible(false);
          setPasswordError("");
        }}
      >
        <View style={styles.passwordModalContent}>
          <Text style={styles.passwordModalTitle}>Confirm Password</Text>
          <TextInput
            style={styles.passwordModalInput}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
            }}
            placeholder="Enter your password"
            secureTextEntry
            placeholderTextColor={
              theme === "light" ? "rgba(30,30,30,0.5)" : "rgba(255,255,255,0.5)"
            }
          />
          {passwordError && (
            <Text style={styles.passwordModalErrorTxt}>{passwordError}</Text>
          )}
          <View style={styles.passwordModalButtonsWrapper}>
            <TouchableOpacity
              style={styles.passwordModalCancelBtn}
              onPress={() => {
                setIsPasswordModalVisible(false);
                setPasswordError("");
              }}
            >
              <Text style={styles.passwordModalCancelBtnTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.passwordModalConfirmBtn}
              onPress={handleConfirmPassword}
            >
              <Text style={styles.passwordModalConfirmBtnTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {notificationVisible && (
        <View style={styles.popUpOverlay}>
          <View style={styles.popUpContent}>
            <Text style={styles.popUpMessageTxt}>{notificationMessage}</Text>
            <View style={styles.popUpButtonsWrapper}>
              {notificationType === "unsaved" && (
                <>
                  <TouchableOpacity
                    style={styles.popUpUnsavedCancelBtn}
                    onPress={handleCloseNotification}
                  >
                    <Text style={styles.popUpUnsavedCancelBtnTxt}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.popUpUnsavedDiscardBtn}
                    onPress={handleNotificationAction}
                  >
                    <Text style={styles.popUpUnsavedDiscardBtnTxt}>
                      Discard
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {notificationType === "noChanges" && (
                <TouchableOpacity
                  style={styles.popUpNoChangesOkBtn}
                  onPress={handleNotificationAction}
                >
                  <Text style={styles.popUpNoChangesOkBtnTxt}>OK</Text>
                </TouchableOpacity>
              )}
              {notificationType === "success" && (
                <TouchableOpacity
                  style={styles.popUpSuccessOkBtn}
                  onPress={handleNotificationAction}
                >
                  <Text style={styles.popUpSuccessOkBtnTxt}>OK</Text>
                </TouchableOpacity>
              )}
              {notificationType === "error" && (
                <TouchableOpacity
                  style={styles.popUpErrorOkBtn}
                  onPress={handleCloseNotification}
                >
                  <Text style={styles.popUpErrorOkBtnTxt}>OK</Text>
                </TouchableOpacity>
              )}
              {notificationType === "logout" && (
                <>
                  <TouchableOpacity
                    style={styles.popUpLogoutCancelBtn}
                    onPress={handleCloseNotification}
                  >
                    <Text style={styles.popUpLogoutCancelBtnTxt}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.popUpLogoutConfirmBtn}
                    onPress={handleNotificationAction}
                  >
                    <Text style={styles.popUpLogoutConfirmBtnTxt}>Logout</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
