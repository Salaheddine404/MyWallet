import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;

type IconName = 'home' | 'person' | 'settings';

type TabType = {
  name: string;
  label: string;
  icon: IconName;
  path: string;
};

export default function AdminTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const translateX = React.useRef(new Animated.Value(0)).current;

  const tabs: TabType[] = [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: 'home',
      path: '/(admin)/dashboard',
    },
    {
      name: 'profile',
      label: 'Profile',
      icon: 'person',
      path: '/(admin)/profile',
    },
    {
      name: 'settings',
      label: 'Settings',
      icon: 'settings',
      path: '/(admin)/settings',
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
}); 