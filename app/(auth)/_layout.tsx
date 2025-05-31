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
        tabBarActiveTintColor: '#7FFFD4',
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 0,
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 30,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
        tabBarItemStyle: {
          padding: 5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(127, 255, 212, 0.2)' : 'transparent',
              padding: 8,
              borderRadius: 20,
            }}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={size} 
                color={color} 
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
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(127, 255, 212, 0.2)' : 'transparent',
              padding: 8,
              borderRadius: 20,
            }}>
              <Ionicons 
                name={focused ? "card" : "card-outline"} 
                size={size} 
                color={color} 
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
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(127, 255, 212, 0.2)' : 'transparent',
              padding: 8,
              borderRadius: 20,
            }}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={size} 
                color={color} 
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
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(127, 255, 212, 0.2)' : 'transparent',
              padding: 8,
              borderRadius: 20,
            }}>
              <Ionicons 
                name={focused ? "cog" : "cog-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
        }}
        initialParams={{ customerId }}
      />
    </Tabs>
  );
} 