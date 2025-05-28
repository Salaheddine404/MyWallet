import { Stack } from 'expo-router';
import { colors } from '../theme/colors';

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="devices"
        options={{
          title: 'My Devices',
        }}
      />
      <Stack.Screen
        name="news"
        options={{
          title: 'News',
        }}
      />
      <Stack.Screen
        name="make-transaction"
        options={{
          title: 'Make Transaction',
        }}
      />
      <Stack.Screen
        name="receivers"
        options={{
          title: 'Bénéficiaires',
        }}
      />
      <Stack.Screen
        name="my-benefits"
        options={{
          title: 'My Benefits',
        }}
      />
      <Stack.Screen
        name="client-relation"
        options={{
          title: 'Client Relation',
        }}
      />
    </Stack>
  );
} 