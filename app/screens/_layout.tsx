import { Stack } from 'expo-router';
import { colors } from '../theme/colors';
import { Platform } from 'react-native';

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animationDuration: 200,
        presentation: 'card',
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen
        name="devices"
        options={{
          title: 'My Devises',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="news"
        options={{
          title: 'News',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="make-transaction"
        options={{
          title: 'Make Transaction',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="beneficiaries"
        options={{
          title: 'Beneficiaries',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="receivers"
        options={{
          title: 'Bénéficiaires',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="my-benefits"
        options={{
          title: 'My Benefits',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="client-relation"
        options={{
          title: 'Client Relation',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="admin-dashboard"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 