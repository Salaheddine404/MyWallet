import { Stack } from 'expo-router';
import { BackgroundImage } from './components/BackgroundImage';
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set isReady to true after the component mounts
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isIndex = segments.length === 0 || segments[0] === undefined;
    const isTransactionsScreen = segments[0] === "screens" && segments[1] === "transactions";
    const isCardManagementScreen = segments[0] === "screens" && segments[1] === "card-management";
    const isDevicesScreen = segments[0] === "screens" && segments[1] === "devices";
    const isNewsScreen = segments[0] === "screens" && segments[1] === "news";
    
    // Get the customerId from the URL if it exists
    const customerId = segments[1]?.split("?")[1]?.split("=")[1];
    
    // Only redirect if we're not in the auth group, not on the index page, and not on the screens
    if (!inAuthGroup && !isIndex && !isTransactionsScreen && !isCardManagementScreen && !isDevicesScreen && !isNewsScreen && !["home", "profile", "request-card", "settings"].includes(segments[0])) {
      router.replace("/");
    }
  }, [segments, isReady]);

  if (!isReady) {
    return (
      <View style={{ flex: 1 }} />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BackgroundImage>
          <Slot />
        </BackgroundImage>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
