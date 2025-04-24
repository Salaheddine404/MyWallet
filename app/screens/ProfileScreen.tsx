import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCustomerProfile } from "../services/profile";

export default function ProfileScreen() {
  const { customerId } = useLocalSearchParams();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchCustomerProfile(customerId as string).then(setProfile);
  }, [customerId]);

  if (!profile) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {profile.firstnameen} {profile.lastnameen}</Text>
      <Text style={styles.label}>National ID: {profile.nationalid}</Text>
      <Text style={styles.label}>Customer ID: {profile.customerid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});
