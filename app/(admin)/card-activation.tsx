import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

// Mock data for demonstration
const activatedCards = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  cardHolder: `Client ${i + 1}`,
  cardNumber: `****${Math.floor(Math.random() * 9000) + 1000}`,
  activationDate: `${Math.floor(Math.random() * 24)} hours ago`,
  cardType: ['Visa', 'Mastercard', 'American Express'][Math.floor(Math.random() * 3)],
}));

export default function CardActivationScreen() {
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
          <Text style={styles.searchPlaceholder}>Search cards...</Text>
        </View>

        <ScrollView style={styles.cardList}>
          {activatedCards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <View style={styles.cardHeader}>
                <View style={styles.cardType}>
                  <Ionicons 
                    name={card.cardType === 'Visa' ? 'card' : 'card-outline'} 
                    size={24} 
                    color={colors.primary} 
                  />
                  <Text style={styles.cardTypeText}>{card.cardType}</Text>
                </View>
                <Text style={styles.activationDate}>{card.activationDate}</Text>
              </View>
              
              <View style={styles.cardDetails}>
                <Text style={styles.cardHolder}>{card.cardHolder}</Text>
                <Text style={styles.cardNumber}>{card.cardNumber}</Text>
              </View>

              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="eye-outline" size={20} color={colors.primary} />
                  <Text style={styles.actionButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.deactivateButton]}>
                  <Ionicons name="close-circle-outline" size={20} color={colors.status.error} />
                  <Text style={[styles.actionButtonText, styles.deactivateText]}>Deactivate</Text>
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
  cardList: {
    flex: 1,
  },
  cardItem: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTypeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  activationDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  cardDetails: {
    marginBottom: 15,
  },
  cardHolder: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  deactivateButton: {
    backgroundColor: colors.status.error + '10',
  },
  deactivateText: {
    color: colors.status.error,
  },
}); 