import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCustomerProfile } from "../services/api";

interface Customer {
  customer: string;
  name: string;
  nationalid?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export default function ProfileScreen() {
  const { customerId } = useLocalSearchParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomerProfile() {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching profile for customer:", customerId);
        const customerData = await fetchCustomerProfile(customerId as string);
        console.log("Received customer data:", customerData);
        
        if (customerData) {
          setCustomer(customerData);
        } else {
          setError("No customer profile found.");
        }
      } catch (err) {
        console.error("Error in loadCustomerProfile:", err);
        setError("Failed to load customer profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (customerId) {
      loadCustomerProfile();
    }
  }, [customerId]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Customer ID:</Text>
        <Text style={styles.value}>{customer?.customer}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{customer?.name}</Text>
      </View>
      {customer?.nationalid && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>National ID:</Text>
          <Text style={styles.value}>{customer.nationalid}</Text>
        </View>
      )}
      {customer?.address && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{customer.address}</Text>
        </View>
      )}
      {customer?.phone && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{customer.phone}</Text>
        </View>
      )}
      {customer?.email && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{customer.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
}); 