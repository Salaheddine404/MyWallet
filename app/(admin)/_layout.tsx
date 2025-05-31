import { Stack } from 'expo-router';
import { colors } from '../theme/colors';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="clients" />
      <Stack.Screen name="card-activation" />
      <Stack.Screen name="transactions" />
      <Stack.Screen name="missing-cards" />
    </Stack>
  );
} 