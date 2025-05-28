import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
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
    const loadProfile = async () => {
      try {
        const data = await fetchCustomerProfile(customerId);
        setCustomer(data);
      } catch (err) {
        setError('Failed to load profile. Please try again.');
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [customerId]);

  if (loading) {
    return (
      <ImageBackground
        source={require('../../assets/images/background.webp')}
        style={styles.backgroundImage}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground
        source={require('../../assets/images/background.webp')}
        style={styles.backgroundImage}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/background.webp')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color={colors.white} />
              </View>
            </View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>SAAID TALIBI</Text>
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
              <Text style={styles.value}>2546-6598-4471-4898</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>National ID</Text>
              <Text style={styles.value}>Z24561</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="person-circle" size={24} color={colors.primary} />
              <Text style={styles.cardTitle}>Personal Information</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>SAAID TALIBI</Text>
            </View>
            {customer?.birthdate && (
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text style={styles.value}>{customer.birthdate}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  profileHeader: {
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 5,
  },
  nameText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 10,
  },
  infoContainer: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  label: {
    fontSize: 14,
    color: colors.gray[200],
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.white,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 16,
    textAlign: 'center',
  },
}); 