import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import ProfileSection from "../../../components/profile/ProfileSection";
import ProfileActions from "../../../components/profile/ProfileActions";
import { getProfile } from "../../api/user";

export default function Profile() {
  const navigation = useNavigation();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2F3039" />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.errorText}>
            {error?.message || "Failed to load profile. Please try again."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
            onEditPress={() => navigation.navigate("EditProfile", { profile })}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#D8696B",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});
