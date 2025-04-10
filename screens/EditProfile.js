import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Svg, Path } from "react-native-svg";

const EditProfile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    firstName: "Bader",
    lastName: "Alqallaf",
    dateOfBirth: "1990-01-01",
    email: "bderalq@gmail.com",
    profilePicture: null,
  });

  const handleSave = () => {
    console.log("Profile updated:", profile);
    navigation.goBack();
  };

  const handleImagePick = () => {
    console.log("Image pick requested");
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
            <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#FEF7FF"
              />
            </Svg>
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

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
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
  },
  changePhotoText: {
    color: "#2F3039",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#1D1B20",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  saveButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default EditProfile;
