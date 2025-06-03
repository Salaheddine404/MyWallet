import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Mock data for demonstration
const clients = [
  { id: 1, fullName: 'Said Talibi', pan: '****7890', lastActive: '1 minute ago', status: 'ACTIVE' },
  { id: 2, fullName: 'Yasmine El Mansouri', pan: '****5578', lastActive: '15 minutes ago', status: 'INACTIVE' },
  { id: 3, fullName: 'Ahmed Al Fassi', pan: '****9012', lastActive: '1 hour ago', status: 'ACTIVE' },
  { id: 4, fullName: 'Salma Ben Youssef', pan: '****3856', lastActive: '2 hours ago', status: 'ACTIVE' },
  { id: 5, fullName: 'Nour El Houda Charif', pan: '****4890', lastActive: '3 hours ago', status: 'INACTIVE' },
  { id: 6, fullName: 'Anas El Idrissi', pan: '****1145', lastActive: '4 hours ago', status: 'ACTIVE' },
  { id: 7, fullName: 'Lina Al Amrani', pan: '****6189', lastActive: '5 hours ago', status: 'ACTIVE' },
  { id: 8, fullName: 'Rania Benali', pan: '****0193', lastActive: '6 hours ago', status: 'INACTIVE' },
  { id: 9, fullName: 'Othman El Hariri', pan: '****4567', lastActive: '7 hours ago', status: 'ACTIVE' },
  { id: 10, fullName: 'Iman Al Rachidi', pan: '****8901', lastActive: '8 hours ago', status: 'ACTIVE' },
  // ... Add more clients as needed
];

export default function CardActivationScreen() {
  const [clientList, setClientList] = useState(clients);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = async (clientId: number) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      setClientList(prevList => 
        prevList.map(client => 
          client.id === clientId 
            ? { 
                ...client, 
                status: client.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                lastActive: 'Just now'
              } 
            : client
        )
      );

      Alert.alert(
        'Success',
        `Card ${clientList.find(c => c.id === clientId)?.status === 'ACTIVE' ? 'deactivated' : 'activated'} successfully`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change card status');
    }
  };

  const filteredClients = clientList.filter(client =>
    client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.pan.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Card Activation</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray[400]} />
          <Text style={styles.searchPlaceholder}>Search clients...</Text>
        </View>

        <ScrollView style={styles.clientList}>
          {filteredClients.map((client) => (
            <View key={client.id} style={styles.clientCard}>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{client.fullName}</Text>
                <Text style={styles.clientPan}>PAN: {client.pan}</Text>
                <Text style={styles.lastActive}>Last active: {client.lastActive}</Text>
              </View>
              
              <View style={styles.cardActions}>
                <TouchableOpacity 
                  style={[
                    styles.actionButton,
                    client.status === 'ACTIVE' ? styles.deactivateButton : styles.activateButton
                  ]}
                  onPress={() => handleStatusChange(client.id)}
                >
                  <Ionicons 
                    name={client.status === 'ACTIVE' ? 'close-circle-outline' : 'checkmark-circle-outline'} 
                    size={20} 
                    color={client.status === 'ACTIVE' ? colors.status.error : colors.status.success} 
                  />
                  <Text style={[
                    styles.actionButtonText,
                    client.status === 'ACTIVE' ? styles.deactivateText : styles.activateText
                  ]}>
                    {client.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: colors.gray[400],
    fontSize: 16,
  },
  clientList: {
    flex: 1,
  },
  clientCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clientInfo: {
    marginBottom: 10,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  clientPan: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  lastActive: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  activateButton: {
    backgroundColor: colors.status.success + '10',
  },
  deactivateButton: {
    backgroundColor: colors.status.error + '10',
  },
  activateText: {
    color: colors.status.success,
  },
  deactivateText: {
    color: colors.status.error,
  },
}); 