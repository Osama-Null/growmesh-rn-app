import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Svg, Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfile } from "../../api/user";

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const queryClient = useQueryClient();
  const initialProfile = route.params?.profile || {};

  const [profile, setProfile] = useState({
    firstName: initialProfile.firstName || "",
    lastName: initialProfile.lastName || "",
    dateOfBirth: initialProfile.dateOfBirth || "",
    email: initialProfile.email || "",
    profilePictureUrl: initialProfile.profilePictureUrl || null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const updateProfileMutation = useMutation({
    mutationFn: ({ userInfo, image }) => editProfile(userInfo, image),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert("Error", error?.message || "Failed to update profile");
    },
  });

  const handleImagePick = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        allowsMultipleSelection: false,
        presentationStyle: "fullScreen",
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const validateForm = () => {
    if (!profile.firstName.trim()) {
      Alert.alert("Error", "First name is required");
      return false;
    }
    if (!profile.lastName.trim()) {
      Alert.alert("Error", "Last name is required");
      return false;
    }
    if (!profile.email.trim()) {
      Alert.alert("Error", "Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      Alert.alert("Error", "Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const userInfo = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      dateOfBirth: profile.dateOfBirth,
      email: profile.email,
    };

    updateProfileMutation.mutate(
      {
        userInfo,
        image: selectedImage,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["profile"], data);
          Alert.alert("Success", "Profile updated successfully");
          navigation.goBack();
        },
        onError: (error) => {
          Alert.alert("Error", error?.message || "Failed to update profile");
        },
      },
    );
  };

  const FormSection = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
  }) => (
    <View style={styles.formSection}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(30,30,30,0.5)"
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === "email-address" ? "none" : "words"}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="#1D1B20"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.imagePickerContainer}
          onPress={handleImagePick}
        >
          <View style={styles.placeholderImage}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.profileImage}
              />
            ) : (
              <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="#FEF7FF"
                />
              </Svg>
            )}
          </View>
          <Text style={styles.changePhotoText}>Change Profile Picture</Text>
        </TouchableOpacity>

        <FormSection
          label="First Name"
          value={profile.firstName}
          onChangeText={(text) =>
            setProfile((prev) => ({ ...prev, firstName: text }))
          }
          placeholder="Enter your first name"
        />

        <FormSection
          label="Last Name"
          value={profile.lastName}
          onChangeText={(text) =>
            setProfile((prev) => ({ ...prev, lastName: text }))
          }
          placeholder="Enter your last name"
        />

        <FormSection
          label="Date of Birth"
          value={profile.dateOfBirth}
          onChangeText={(text) =>
            setProfile((prev) => ({ ...prev, dateOfBirth: text }))
          }
          placeholder="YYYY-MM-DD"
        />

        <FormSection
          label="Email"
          value={profile.email}
          onChangeText={(text) =>
            setProfile((prev) => ({ ...prev, email: text }))
          }
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[
            styles.saveButton,
            updateProfileMutation.isPending && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingHorizontal: 24,
    backgroundColor: "#FEF7FF",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1D1B20",
    marginLeft: 16,
    fontFamily: "Roboto",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  imagePickerContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2F3039",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  changePhotoText: {
    color: "#2F3039",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
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
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: "Roboto",
  },
  saveButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default EditProfile;
