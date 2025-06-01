import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { colors } from '../theme/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { customerId } = useLocalSearchParams();
  const router = useRouter();

  const handleTransactionsPress = () => {
    router.push({
      pathname: "/screens/transactions",
      params: { customerId }
    });
  };

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <ImageBackground
      source={require('../../assets/images/loginback.webp')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} onPress={handleTransactionsPress}>
              <Ionicons name="time-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Transaction History</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={() => router.push({ pathname: '/screens/card-management', params: { customerId } })}>
              <Ionicons name="alert-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Card Management</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Security</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="language-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Language</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} style={styles.chevron} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>About</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} style={styles.chevron} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={colors.status.error} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  settingsCard: {
    backgroundColor: '#4b71b4',
    borderRadius: 15,
    padding: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingText: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 15,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a40078',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 10,
    fontWeight: '600',
  },
}); 