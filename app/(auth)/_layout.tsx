import { Stack } from "expo-router";
import { BackgroundImage } from "../components/BackgroundImage";
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import CustomTabBar from '../components/CustomTabBar';

export default function AuthLayout() {
  const { customerId } = useLocalSearchParams();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} customerId={customerId as string} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
        initialParams={{ customerId }}
      />
      <Tabs.Screen
        name="request-card"
        options={{
          title: 'Request Card',
        }}
        initialParams={{ customerId }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
        initialParams={{ customerId }}
      />
      <Tabs.Screen
        name="settings-screen"
        options={{
          title: 'Settings',
        }}
        initialParams={{ customerId }}
      />
    </Tabs>
  );
} 