import { Tabs } from 'expo-router';
import { colors } from '../theme/colors';
import AdminTabBar from '../components/AdminTabBar';

export default function AdminLayout() {
  return (
    <Tabs
      tabBar={(props) => <AdminTabBar />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: 'Add User',
        }}
      />
      <Tabs.Screen
        name="card-activation"
        options={{
          title: 'Manage Cards',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
} 