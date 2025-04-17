import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSection from "../components/profile/ProfileSection";
import ProfileActions from "../components/profile/ProfileActions";

const hardcodedProfile = {
  firstName: "Bader ",
  lastName: "Alqallaf",
  dateOfBirth: "1990-01-01",
  email: "bderalq@gmail.com",
  profilePicture: null,
};

export default function Profile() {
  const navigation = useNavigation();
  const [profile] = useState(hardcodedProfile);

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout pressed");
  };

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

          <ProfileActions
            onEditPress={() => navigation.navigate("EditProfile")}
            onLogout={handleLogout}
          />
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
});
