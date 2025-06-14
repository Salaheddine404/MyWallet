import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function AdminProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileIcon}>
              <Ionicons name="person-circle" size={80} color={colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Hicham EL-KASMI</Text>
              <Text style={styles.profileRole}>Administrator</Text>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.detailItem}>
                <Ionicons name="mail-outline" size={24} color={colors.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Email</Text>
                  <Text style={styles.detailValue}>helkasmi@s2M.ma</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="call-outline" size={24} color={colors.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Phone</Text>
                  <Text style={styles.detailValue}>+212 662099060</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              <View style={styles.detailItem}>
                <Ionicons name="id-card-outline" size={24} color={colors.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Admin ID</Text>
                  <Text style={styles.detailValue}>100001</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Role</Text>
                  <Text style={styles.detailValue}>System Administrator</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileIcon: {
    marginBottom: 15,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  profileDetails: {
    gap: 25,
  },
  detailSection: {
    gap: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  detailTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text.primary,
  },
}); 