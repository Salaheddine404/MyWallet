import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const settingsOptions = [
    {
      title: 'Account Settings',
      icon: 'person-outline',
      options: [
        { label: 'Personal Information', icon: 'information-circle-outline' },
        { label: 'Security Settings', icon: 'shield-checkmark-outline' },
        { label: 'Notification Preferences', icon: 'notifications-outline' },
      ],
    },
    {
      title: 'Card Management',
      icon: 'card-outline',
      options: [
        { label: 'Card Limits', icon: 'speedometer-outline' },
        { label: 'Transaction History', icon: 'time-outline' },
        { label: 'Card Controls', icon: 'settings-outline' },
      ],
    },
    {
      title: 'App Settings',
      icon: 'settings-outline',
      options: [
        { label: 'Language', icon: 'language-outline' },
        { label: 'Theme', icon: 'color-palette-outline' },
        { label: 'Help & Support', icon: 'help-circle-outline' },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Navigate to the login screen
            router.replace('/');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {settingsOptions.map((section, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name={section.icon as any} size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          
          {section.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={styles.optionItem}
              onPress={() => {
                // Handle option press
                console.log(`Pressed ${option.label}`);
              }}
            >
              <View style={styles.optionContent}>
                <Ionicons name={option.icon as any} size={20} color={colors.text.primary} />
                <Text style={styles.optionLabel}>{option.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color={colors.status.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white,
  },
  section: {
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginHorizontal: 15,
    padding: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.status.error,
    marginLeft: 10,
  },
}); 