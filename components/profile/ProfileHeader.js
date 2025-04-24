import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const BACKEND_BASE_URL = "http://192.168.2.132:5208"; 
const ProfileHeader = ({ profile }) => {
  const firstName = profile?.firstName || "Unknown";
  const lastName = profile?.lastName || "User";
  const email = profile?.email || "No email provided";

  const profilePictureUrl = profile?.profilePicture
    ? `${BACKEND_BASE_URL}${profile.profilePicture}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s";

  console.log("Profile Picture URL:", profilePictureUrl);

  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: profilePictureUrl }}
            style={styles.profileImage}
            resizeMode="cover"
            onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
            onLoad={() => console.log("Image loaded successfully")}
          />
          {profilePictureUrl === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s" && (
            <Text style={{ position: "absolute", color: "red", fontSize: 10 }}>
              Using Fallback Image
            </Text>
          )}
        </View>
        <Text style={styles.profileName}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: "Roboto",
  },
  profileEmail: {
    fontSize: 16,
    color: "#1D1B20",
    opacity: 0.6,
    fontFamily: "Roboto",
  },
});

export default ProfileHeader;