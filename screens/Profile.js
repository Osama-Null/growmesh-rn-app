import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function ViewProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get('https://your-api-url/api/User/profile', {
//         headers: {
//           Authorization: Bearer YOUR_JWT_TOKEN
//         }
//       });
//       setProfile(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name:</Text>
      <Text style={styles.value}>{profile.fullName}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{profile.email}</Text>

      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile', { profile })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 20 },
  value: { fontSize: 16 }
});
