import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: 'people-outline' },
    { title: 'Active Cards', value: '856', icon: 'card-outline' },
    { title: 'Transactions', value: '2,567', icon: 'swap-horizontal-outline' },
    { title: 'Revenue', value: 'MAD 1.2M', icon: 'trending-up-outline' },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago' },
    { id: 2, action: 'Card activated', time: '15 minutes ago' },
    { id: 3, action: 'Large transaction processed', time: '1 hour ago' },
    { id: 4, action: 'System update completed', time: '2 hours ago' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon} size={24} color={colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>{activity.action}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray[400]} />
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="person-add-outline" size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>Add User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="card-outline" size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>Manage Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="settings-outline" size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/profile')}
            >
              <Ionicons name="person-circle-outline" size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>Profile</Text>
            </TouchableOpacity>
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginVertical: 5,
  },
  statTitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    width: '23%',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: colors.white,
    marginTop: 6,
    fontSize: 11,
    textAlign: 'center',
  },
}); 