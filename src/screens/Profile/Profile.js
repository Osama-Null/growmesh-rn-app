// import React from "react";
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import { useQuery } from "@tanstack/react-query";
// import * as SecureStore from "expo-secure-store";
// import ProfileHeader from "../../../components/profile/ProfileHeader";
// import ProfileSection from "../../../components/profile/ProfileSection";
// import ProfileActions from "../../../components/profile/ProfileActions";
// import { getProfile } from "../../api/user";
// 

// export default function Profile() {
//   const navigation = useNavigation();

//   const {
//     data: profile,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["profile"],
//     queryFn: getProfile,
//   });

//   const handleLogout = async () => {
//     try {
//       await SecureStore.deleteItemAsync("userToken");
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "Auth" }],
//       });
//     } catch (error) {
//       Alert.alert("Error", "Failed to logout. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#2F3039" />
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (isError) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.contentContainer}>
//           <Text style={styles.errorText}>
//             {error?.message || "Failed to load profile. Please try again."}
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style ={styles.row}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("Faq")}
//         >
//         <Ionicons name="help-circle-outline" size={35} color="black" />
//         </TouchableOpacity>
//         </View>
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         <ProfileHeader profile={profile} />
      
//         <View style={styles.contentContainer}>
//           <ProfileSection title="First Name" value={profile.firstName} />
//           <ProfileSection title="Last Name" value={profile.lastName} />
//           <ProfileSection
//             title="Date of Birth"
//             value={new Date(profile.dateOfBirth).toLocaleDateString()}
//           />
//           <ProfileSection title="Email" value={profile.email} />

//           <ProfileActions
//             onEditPress={() => navigation.navigate("EditProfile", { profile })}
//             onLogout={handleLogout}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FEF7FF",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//    // paddingVertical: 6,
//    // marginTop: 8,
//     //marginBottom: 9,
//     marginHorizontal: 16,
//   },
//   image: {
//     width: 41,
//     height: 41,
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "#D8696B",
//     textAlign: "center",
//     fontSize: 16,
//     fontFamily: "Roboto",
//   },
// });

import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import ProfileSection from "../../../components/profile/ProfileSection";
import ProfileActions from "../../../components/profile/ProfileActions";
import { getProfile, profileAgent } from "../../api/user";
import Modal from "react-native-modal";
import ChatScreen from "../../components/ChatScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Profile() {
  const navigation = useNavigation();
  // Llama ============================================
  const [isModalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((prev) => [...newMessages, ...prev]);
    const userMessage = newMessages[0].text;

    try {
      const response = await profileAgent(userMessage);
      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text: response.Response,
        createdAt: new Date(),
        user: { _id: 2, name: "Profile Agent" },
      };
      setMessages((prev) => [botMessage, ...prev]);
    } catch (error) {
      const errorMessage = {
        _id: Math.random().toString(36).substring(7),
        text: "Sorry, I encountered an error. Please try again.",
        createdAt: new Date(),
        user: { _id: 2, name: "Profile Agent" },
      };
      setMessages((prev) => [errorMessage, ...prev]);
    }
  }, []);

  const handleClose = () => {
    setModalVisible(false);
  };
  // ============================================ Llama

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

  console.log("Profile data in Profile.js:", profile);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate("Faq")}>
          <Ionicons name="help-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // paddingVertical: 6,
    // marginTop: 8,
    //marginBottom: 9,
    marginHorizontal: 16,
  },
  image: {
    width: 41,
    height: 41,
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
