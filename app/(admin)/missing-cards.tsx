import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

// Mock data for Said Talibi's missing card
const missingCards = [
  {
    id: 1,
    clientName: 'Said Talibi',
    cardNumber: '6011********8901',
    reportedDate: '2 hours ago',
    status: 'Reported',
    cardType: 'VISA'
  }
];

export default function MissingCardsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Missing Cards</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray[400]} />
          <Text style={styles.searchPlaceholder}>Search missing cards...</Text>
        </View>

        <ScrollView style={styles.cardList}>
          {missingCards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Ionicons name="alert-circle-outline" size={24} color={colors.status.warning} />
                  <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                </View>
                <Text style={styles.reportedDate}>{card.reportedDate}</Text>
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{card.clientName}</Text>
                  <Text style={styles.cardType}>{card.cardType}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: colors.status.error + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: colors.status.error }
                  ]}>
                    {card.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="eye-outline" size={20} color={colors.primary} />
                  <Text style={styles.actionButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.replaceButton]}>
                  <Ionicons name="card-outline" size={20} color={colors.status.success} />
                  <Text style={[styles.actionButtonText, styles.replaceText]}>Replace Card</Text>
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
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumber: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  reportedDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardType: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
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
  replaceButton: {
    backgroundColor: colors.status.success + '10',
  },
  replaceText: {
    color: colors.status.success,
  },
}); 