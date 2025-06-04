import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { router } from 'expo-router';

type SettingItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'toggle' | 'link' | 'button';
  value?: boolean;
  onPress?: () => void;
};

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const settings: SettingItem[] = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      icon: 'notifications-outline',
      type: 'toggle',
      value: notifications,
      onPress: () => setNotifications(!notifications),
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      icon: 'moon-outline',
      type: 'toggle',
      value: darkMode,
      onPress: () => setDarkMode(!darkMode),
    },
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      icon: 'finger-print-outline',
      type: 'toggle',
      value: biometric,
      onPress: () => setBiometric(!biometric),
    },
    {
      id: 'language',
      title: 'Language',
      icon: 'language-outline',
      type: 'link',
      onPress: () => Alert.alert('Language', 'Language settings will be available soon'),
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: 'shield-checkmark-outline',
      type: 'link',
      onPress: () => Alert.alert('Security', 'Security settings will be available soon'),
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-circle-outline',
      type: 'link',
      onPress: () => Alert.alert('About', 'MyWallet v1.0.0\n© 2024 All rights reserved'),
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: 'log-out-outline',
      type: 'button',
      onPress: () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Logout',
              style: 'destructive',
              onPress: () => router.replace('/'),
            },
          ]
        );
      },
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color={colors.white} />
          </View>
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>
        {item.type === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: colors.gray[600], true: colors.primary }}
            thumbColor={colors.white}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.gray[400]}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homescreenback.webp')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            {settings.slice(0, 3).map(renderSettingItem)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            {settings.slice(3, 5).map(renderSettingItem)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            {settings.slice(5, 6).map(renderSettingItem)}
          </View>

          <View style={styles.section}>
            {settings.slice(6).map(renderSettingItem)}
          </View>
        </ScrollView>
      </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    marginRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginVertical: 15,
    opacity: 0.7,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
  },
}); 