import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { colors } from '../theme/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LogoutConfirmation from '../components/LogoutConfirmation';
import { useState } from 'react';

export default function SettingsScreen() {
  const { customerId } = useLocalSearchParams();
  const router = useRouter();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleTransactionsPress = () => {
    router.push({
      pathname: "/screens/transactions",
      params: { customerId }
    });
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirmation(false);
    router.replace("/");
  };

  return (
    <ImageBackground
      source={require('../../assets/images/back3.webp')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} onPress={handleTransactionsPress}>
              <View style={styles.iconContainer}>
                <Ionicons name="time-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.settingText}>Transaction History</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={() => router.push({ pathname: '/screens/card-management', params: { customerId } })}>
              <View style={styles.iconContainer}>
                <Ionicons name="card-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.settingText}>Card Management</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.settingText}>Security</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="language-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.settingText}>Language</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.settingText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.settingText}>About</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.primary} style={styles.chevron} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={colors.white} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LogoutConfirmation
        visible={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={handleConfirmLogout}
      />
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
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 25,
  },
  settingsCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
  settingText: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 16,
    marginTop: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoutText: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 10,
    fontWeight: '600',
  },
}); 