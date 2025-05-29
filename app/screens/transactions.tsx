import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  category?: string;
}

// Mock data for transactions
const mockTransactions: Transaction[] = [
  { id: '1', type: 'credit', amount: 500, description: 'Salary', date: '2024-03-20', category: 'Income' },
  { id: '2', type: 'debit', amount: 100, description: 'Grocery Shopping', date: '2024-03-19', category: 'Shopping' },
  { id: '3', type: 'debit', amount: 50, description: 'Coffee Shop', date: '2024-03-18', category: 'Food & Drink' },
  { id: '4', type: 'credit', amount: 200, description: 'Refund', date: '2024-03-17', category: 'Refund' },
];

export default function TransactionsScreen() {
  const { customerId } = useLocalSearchParams();
  const router = useRouter();
  const balance = 24155.26; // Mock balance

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'income':
        return 'cash-outline';
      case 'shopping':
        return 'cart-outline';
      case 'food & drink':
        return 'restaurant-outline';
      case 'refund':
        return 'return-down-back-outline';
      default:
        return 'card-outline';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.webp')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.section}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Transaction History</Text>
          </View>

          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>{balance.toLocaleString()} MAD</Text>
          </View>

          <View style={styles.transactionsList}>
            {mockTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionBox}>
                <View style={styles.transactionRow}>
                  <View style={styles.iconContainer}>
                    <Ionicons 
                      name={getCategoryIcon(transaction.category || '')} 
                      size={24} 
                      color={colors.primary} 
                    />
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionDescription}>{transaction.description}</Text>
                    <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  </View>
                  <Text style={[
                    styles.transactionAmount,
                    transaction.type === 'credit' ? styles.creditAmount : styles.debitAmount
                  ]}>
                    {transaction.type === 'credit' ? '+' : '-'}{Math.abs(transaction.amount)} MAD
                  </Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
                  <Text style={styles.transactionType}>
                    {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  backButton: {
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
  },
  balanceBox: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.gray[200],
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
  },
  transactionsList: {
    gap: 16,
  },
  transactionBox: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: colors.gray[300],
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  creditAmount: {
    color: colors.status.success,
  },
  debitAmount: {
    color: colors.status.error,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  transactionDate: {
    fontSize: 14,
    color: colors.gray[300],
  },
  transactionType: {
    fontSize: 14,
    color: colors.gray[300],
    textTransform: 'capitalize',
  },
}); 