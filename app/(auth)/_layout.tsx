import { Stack } from "expo-router";
import { BackgroundImage } from "../components/BackgroundImage";
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function AuthLayout() {
  const { customerId } = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          borderTopWidth: 0,
          height: 90,
          paddingBottom: 10,
          paddingTop: 20,
          elevation: 0,
          position: 'absolute',
          bottom: 30,
          left: 25,
          right: 25,
          borderRadius: 35,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          backdropFilter: 'blur(10px)',
          zIndex: 1,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          marginTop: 4,
          color: '#FFFFFF',
        },
        tabBarItemStyle: {
          padding: 0,
          marginTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
              padding: 12,
              borderRadius: 25,
              marginBottom: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name="home" 
                size={32} 
                color="#FFFFFF" 
              />
            </View>
          ),
        }}
        initialParams={{ customerId }}
      />
      <Tabs.Screen
        name="request-card"
        options={{
          title: 'Request Card',
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
              padding: 12,
              borderRadius: 25,
              marginBottom: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name="card" 
                size={32} 
                color="#FFFFFF" 
              />
            </View>
          ),
        }}
        initialParams={{ customerId }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
              padding: 12,
              borderRadius: 25,
              marginBottom: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name="person" 
                size={32} 
                color="#FFFFFF" 
              />
            </View>
          ),
        }}
        initialParams={{ customerId }}
      />
      <Tabs.Screen
        name="settings-screen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
              padding: 12,
              borderRadius: 25,
              marginBottom: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name="settings" 
                size={32} 
                color="#FFFFFF" 
              />
            </View>
          ),
        }}
        initialParams={{ customerId }}
      />
    </Tabs>
  );
} 