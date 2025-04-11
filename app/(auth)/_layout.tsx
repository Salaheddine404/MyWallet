import { Stack } from "expo-router";
import { View } from "react-native";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Navbar />
    </View>
  );
} 