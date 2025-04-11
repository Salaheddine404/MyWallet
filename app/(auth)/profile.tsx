import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCustomerProfile } from "../services/api";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

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
        const customerData = await fetchCustomerProfile(customerId as string);
        
        if (customerData) {
          setCustomer(customerData);
        } else {
          setError("No customer profile found.");
        }
      } catch (err) {
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
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color={colors.status.error} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={colors.white} />
          </View>
        </View>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>
          {customer?.firstnameen} {customer?.lastnameen}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="card" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Account Details</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Customer ID</Text>
          <Text style={styles.value}>{customer?.customerid}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Account Number</Text>
          <Text style={styles.value}>{customer?.customer}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>National ID</Text>
          <Text style={styles.value}>{customer?.nationalid}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Personal Information</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>
            {customer?.firstnameen} {customer?.middnameen} {customer?.lastnameen}
          </Text>
        </View>
        {customer?.birthdate && (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>{customer.birthdate}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray[300],
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 5,
  },
  nameText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    margin: 15,
    marginTop: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginLeft: 10,
  },
  infoContainer: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: "500",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: colors.status.error,
    textAlign: "center",
    marginTop: 10,
  },
}); 