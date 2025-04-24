import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchCustomerProfile } from '../services/profile';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

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
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Profile Screen mounted with customerId:', customerId);
    
    if (customerId) {
      loadCustomerProfile();
    } else {
      console.error('No customerId provided');
      setError('Customer ID is required');
      setLoading(false);
    }
  }, [customerId]);

  const loadCustomerProfile = async () => {
    console.log('Starting to load profile for customerId:', customerId);
    try {
      setLoading(true);
      setError(null);
      console.log('Calling fetchCustomerProfile with customerId:', customerId);
      const customerData = await fetchCustomerProfile(customerId);
      console.log('Received customer data:', customerData);
      
      if (customerData) {
        console.log('Setting customer data:', customerData);
        setCustomer(customerData);
      } else {
        console.log('No customer data received');
        setError('No customer data found');
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load customer profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    color: colors.text.primary,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 16,
    textAlign: 'center',
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
}); 