import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";

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
          <Image
            source={{
              uri: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
            }}
            style={styles.profileImage}
          />
        )}
      </View>
      <Text
        style={styles.profileName}
      >{`${profile.firstName} ${profile.lastName}`}</Text>
      <Text style={styles.profileEmail}>{profile.email}</Text>
    </View>
  </View>
);

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
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profileEmail: {
    fontSize: 16,
    color: "#1D1B20",
    opacity: 0.6,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default ProfileHeader;
