import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;

interface TabBarProps {
  customerId: string;
}

type IconName = 'home' | 'card' | 'person' | 'settings';

type TabType = {
  name: string;
  label: string;
  icon: IconName;
  path: string;
};

export default function CustomTabBar({ customerId }: TabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const translateX = React.useRef(new Animated.Value(0)).current;

  // Mock notifications data - replace with real data from your backend
  const notifications = {
    home: 0,
    'request-card': 0,
    profile: 0,
    'settings-screen': 0,
  };

  const tabs: TabType[] = [
    {
      name: 'home',
      label: 'Home',
      icon: 'home',
      path: `/(auth)/home?customerId=${customerId}`,
    },
    {
      name: 'request-card',
      label: 'Request',
      icon: 'card',
      path: `/(auth)/request-card?customerId=${customerId}`,
    },
    {
      name: 'profile',
      label: 'Profile',
      icon: 'person',
      path: `/(auth)/profile?customerId=${customerId}`,
    },
    {
      name: 'settings-screen',
      label: 'Settings',
      icon: 'settings',
      path: `/(auth)/settings-screen?customerId=${customerId}`,
    },
  ];

  useEffect(() => {
    const currentIndex = tabs.findIndex(tab => pathname.includes(tab.name));
    if (currentIndex !== -1) {
      Animated.spring(translateX, {
        toValue: currentIndex * TAB_WIDTH,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }
  }, [pathname]);

  const handleTabPress = (tab: TabType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(tab.path as any);
  };

  const getIconName = (icon: IconName, isActive: boolean): keyof typeof Ionicons.glyphMap => {
    return isActive ? icon : `${icon}-outline` as keyof typeof Ionicons.glyphMap;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX }],
          },
        ]}
      />
      {tabs.map((tab, index) => {
        const isActive = pathname.includes(tab.name);
        const notificationCount = notifications[tab.name as keyof typeof notifications];

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handleTabPress(tab)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={getIconName(tab.icon, isActive)}
                  size={24}
                  color={isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'}
                />
                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)' },
                ]}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'absolute',
    bottom: 30,
    left: 25,
    right: 25,
    borderRadius: 35,
    backdropFilter: 'blur(10px)',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: TAB_WIDTH,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
}); 