import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Svg, Path, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const hardcodedProfile = {
  firstName: "Bader ",
  lastName: "Alqallaf",
  dateOfBirth: "1990-01-01",
  email: "bderalq@gmail.com",
  profilePicture: null,
};

const ProfileHeader = ({ profile }) => (
  <View style={styles.profileHeader}>
    <View style={styles.profileImageContainer}>
      <View style={styles.profileImageWrapper}>
        {profile.profilePicture ? (
          <Image
            source={{ uri: profile.profilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <Svg width={80} height={80} viewBox="0 0 80 80">
            <Circle cx={40} cy={40} r={39} fill="#2F3039" strokeWidth={2} />
            <Path
              d="M40 20C34.48 20 30 24.48 30 30C30 35.52 34.48 40 40 40C45.52 40 50 35.52 50 30C50 24.48 45.52 20 40 20ZM40 60C31.66 60 24.36 56.82 20 51.84C20.14 45.92 32 42.66 40 42.66C47.98 42.66 59.86 45.92 60 51.84C55.64 56.82 48.34 60 40 60Z"
              fill="#FEF7FF"
            />
          </Svg>
        )}
      </View>
      <Text
        style={styles.profileName}
      >{`${profile.firstName} ${profile.lastName}`}</Text>
      <Text style={styles.profileEmail}>{profile.email}</Text>
    </View>
  </View>
);

const ProfileSection = ({ title, value }) => (
  <View style={styles.profileSection}>
    <Text style={styles.sectionLabel}>{title}</Text>
    <View style={styles.sectionContent}>
      <Text style={styles.sectionValue}>{value}</Text>
    </View>
  </View>
);

export default function Profile() {
  const navigation = useNavigation();
  const [profile] = useState(hardcodedProfile);

  return (
    <SafeAreaView style={styles.container}>
     
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader profile={profile} />

        <View style={styles.contentContainer}>
          <ProfileSection title="First Name" value={profile.firstName} />
          <ProfileSection title="Last Name" value={profile.lastName} />
          <ProfileSection
            title="Date of Birth"
            value={new Date(profile.dateOfBirth).toLocaleDateString()}
          />
          <ProfileSection title="Email" value={profile.email} />

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    width: "100%",
    height: 52,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#FEF7FF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusBarContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1B20",
    letterSpacing: 0.14,
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
  },
  profileImageContainer: {
    alignItems: "center",
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2F3039",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1D1B20",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profileEmail: {
    fontSize: 16,
    color: "#1D1B20",
    opacity: 0.6,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  contentContainer: {
    padding: 20,
  },
  profileSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    color: "#1D1B20",
    opacity: 0.6,
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  sectionContent: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 14,
    padding: 16,
  },
  sectionValue: {
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
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
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
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
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});
