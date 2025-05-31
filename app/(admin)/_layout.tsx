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
    </Stack>
  );
} 