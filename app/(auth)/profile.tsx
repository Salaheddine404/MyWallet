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
        source={require('../../assets/images/loginback.webp')}
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
        source={require('../../assets/images/loginback.webp')}
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
      source={require('../../assets/images/loginback.webp')}
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
    paddingTop: 50,
  },
  section: {
    padding: 20,
  },
  profileHeader: {
    marginBottom: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 8,
    opacity: 0.8,
  },
  nameText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    padding: 25,
    marginBottom: 25,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 12,
  },
  infoContainer: {
    marginBottom: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  label: {
    fontSize: 15,
    color: colors.gray[200],
    marginBottom: 6,
  },
  value: {
    fontSize: 17,
    color: colors.white,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  loadingText: {
    marginTop: 15,
    color: colors.white,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 16,
    textAlign: 'center',
  },
}); 