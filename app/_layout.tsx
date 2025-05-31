import { Slot, useSegments, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { colors } from './theme/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BackgroundImage } from './components/BackgroundImage';
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

    const inAuthGroup = segments[0] === '(auth)';
    const inAdminGroup = segments[0] === '(admin)';
    const inScreensGroup = segments[0] === 'screens';
    const inHomeGroup = segments[0] === 'home';
    
    // Get customerId from URL if it exists
    const url = new URL(window.location.href);
    const customerId = url.searchParams.get('customerId');

    if (!inAuthGroup && !inAdminGroup && !inScreensGroup && !inHomeGroup) {
      // If we're not in any of the allowed groups, redirect to home
      if (customerId) {
        router.replace(`/home?customerId=${customerId}`);
      } else {
        router.replace('/');
      }
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
