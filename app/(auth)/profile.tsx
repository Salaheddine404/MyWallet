import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCustomerProfile } from "../services/api";

interface Customer {
  customer: number;
  customerid: string;
  firstnameen: string;
  middnameen: string;
  lastnameen: string;
  nationalid: string;
  birthdate: string | null;
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Customer Profile</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Customer ID:</Text>
          <Text style={styles.value}>{customer?.customerid}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Customer Number:</Text>
          <Text style={styles.value}>{customer?.customer}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>National ID:</Text>
          <Text style={styles.value}>{customer?.nationalid}</Text>
        </View>
        {customer?.birthdate && (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Birth Date:</Text>
            <Text style={styles.value}>{customer.birthdate}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Name Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{customer?.firstnameen}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Middle Name:</Text>
          <Text style={styles.value}>{customer?.middnameen}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{customer?.lastnameen}</Text>
        </View>
      </View>
    </ScrollView>
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
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  infoContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
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