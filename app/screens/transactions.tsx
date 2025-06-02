import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useTransactionStore } from '../store/transactionStore';

export default function TransactionsScreen() {
  const { customerId } = useLocalSearchParams();
  const router = useRouter();
  const { balance, transactions } = useTransactionStore();
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'credit') return transaction.type === 'credit';
    if (selectedFilter === 'debit') return transaction.type === 'debit';
    return true;
  });

  return (
    <ImageBackground
      source={require('../../assets/images/homescreenback.webp')}
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

          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['all', 'credit', 'debit'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedFilter === filter && styles.filterButtonTextActive,
                    ]}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.transactionsList}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TouchableOpacity
                  key={transaction.id}
                  style={styles.transactionBox}
                  onPress={() => {
                    // Handle transaction details view
                  }}
                >
                  <View style={styles.transactionRow}>
                    <View style={styles.iconContainer}>
                      <Ionicons 
                        name={getCategoryIcon(transaction.description || '')} 
                        size={24} 
                        color={transaction.type === 'credit' ? colors.primary : colors.status.error} 
                      />
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionDescription}>
                        {transaction.type === 'credit' ? `From: ${transaction.sender}` : `To: ${transaction.receiver}`}
                      </Text>
                      <Text style={styles.transactionCategory}>{transaction.description}</Text>
                    </View>
                    <Text style={[
                      styles.transactionAmount,
                      transaction.type === 'credit' ? styles.creditAmount : styles.debitAmount
                    ]}>
                      {transaction.type === 'credit' ? '+' : ''}{transaction.amount} MAD
                    </Text>
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
                    <Text style={styles.transactionType}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="receipt-outline" size={64} color={colors.white} />
                <Text style={styles.emptyText}>No transactions yet</Text>
                <Text style={styles.emptySubtext}>
                  Your transaction history will appear here
                </Text>
              </View>
            )}
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
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
    paddingTop: 20,
  },
  backButton: {
    marginRight: 15,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
    marginTop: 10,
  },
  balanceBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    alignItems: 'center',
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
  filterContainer: {
    marginBottom: 20,
    width: '100%',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 16,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  transactionBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 16,
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
    textAlign: 'right',
    minWidth: 100,
  },
  creditAmount: {
    color: colors.primary,
  },
  debitAmount: {
    color: colors.status.error,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
    marginTop: 4,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    width: '100%',
  },
  emptyText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    marginTop: 8,
  },
}); 