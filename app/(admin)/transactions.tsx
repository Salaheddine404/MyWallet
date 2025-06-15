import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Mock data for demonstration
const transactions = [
  {
    id: 1,
    clientId: 1,
    clientName: 'Said Talibi',
    amount: 1500.00,
    type: 'DEPOSIT',
    date: '2024-03-20 14:30',
    status: 'COMPLETED',
    description: 'Salary deposit'
  },
  {
    id: 2,
    clientId: 2,
    clientName: 'Yasmine El Mansouri',
    amount: -750.50,
    type: 'WITHDRAWAL',
    date: '2024-03-20 13:15',
    status: 'COMPLETED',
    description: 'ATM withdrawal'
  },
  {
    id: 3,
    clientId: 3,
    clientName: 'Ahmed Al Fassi',
    amount: 2500.00,
    type: 'TRANSFER',
    date: '2024-03-20 12:45',
    status: 'PENDING',
    description: 'Transfer to family member'
  },
  {
    id: 4,
    clientId: 4,
    clientName: 'Salma Ben Youssef',
    amount: -120.75,
    type: 'PURCHASE',
    date: '2024-03-20 11:20',
    status: 'COMPLETED',
    description: 'Grocery store purchase'
  },
  {
    id: 5,
    clientId: 5,
    clientName: 'Nour El Houda Charif',
    amount: 500.00,
    type: 'DEPOSIT',
    date: '2024-03-20 10:15',
    status: 'COMPLETED',
    description: 'Cash deposit'
  },
  {
    id: 6,
    clientId: 6,
    clientName: 'Anas El Idrissi',
    amount: -2000.00,
    type: 'TRANSFER',
    date: '2024-03-20 09:30',
    status: 'FAILED',
    description: 'International transfer'
  },
  {
    id: 7,
    clientId: 7,
    clientName: 'Lina Al Amrani',
    amount: 300.00,
    type: 'DEPOSIT',
    date: '2024-03-19 16:45',
    status: 'COMPLETED',
    description: 'Mobile deposit'
  },
  {
    id: 8,
    clientId: 8,
    clientName: 'Rania Benali',
    amount: -85.25,
    type: 'PURCHASE',
    date: '2024-03-19 15:20',
    status: 'COMPLETED',
    description: 'Restaurant payment'
  },
  {
    id: 9,
    clientId: 9,
    clientName: 'Othman El Hariri',
    amount: 1000.00,
    type: 'TRANSFER',
    date: '2024-03-19 14:10',
    status: 'PENDING',
    description: 'Bill payment'
  },
  {
    id: 10,
    clientId: 10,
    clientName: 'Iman Al Rachidi',
    amount: -150.00,
    type: 'WITHDRAWAL',
    date: '2024-03-19 13:05',
    status: 'COMPLETED',
    description: 'ATM withdrawal'
  }
];

export default function TransactionsScreen() {
  const [transactionList, setTransactionList] = useState(transactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const handleTransactionAction = async (transactionId: number, action: 'approve' | 'reject') => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      setTransactionList(prevList => 
        prevList.map(transaction => 
          transaction.id === transactionId 
            ? { 
                ...transaction, 
                status: action === 'approve' ? 'COMPLETED' : 'FAILED'
              } 
            : transaction
        )
      );

      Alert.alert(
        'Success',
        `Transaction ${action === 'approve' ? 'approved' : 'rejected'} successfully`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process transaction');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return colors.status.success;
      case 'PENDING':
        return colors.status.warning;
      case 'FAILED':
        return colors.status.error;
      default:
        return colors.text.secondary;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return 'arrow-down-circle';
      case 'WITHDRAWAL':
        return 'arrow-up-circle';
      case 'TRANSFER':
        return 'swap-horizontal';
      case 'PURCHASE':
        return 'cart';
      default:
        return 'card';
    }
  };

  const filteredTransactions = transactionList.filter(transaction =>
    (transaction.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterStatus || transaction.status === filterStatus)
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
        <Text style={styles.headerTitle}>Transactions</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray[400]} />
          <Text style={styles.searchPlaceholder}>Search transactions...</Text>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, !filterStatus && styles.filterButtonActive]}
            onPress={() => setFilterStatus(null)}
          >
            <Text style={[styles.filterButtonText, !filterStatus && styles.filterButtonTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterStatus === 'COMPLETED' && styles.filterButtonActive]}
            onPress={() => setFilterStatus('COMPLETED')}
          >
            <Text style={[styles.filterButtonText, filterStatus === 'COMPLETED' && styles.filterButtonTextActive]}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterStatus === 'PENDING' && styles.filterButtonActive]}
            onPress={() => setFilterStatus('PENDING')}
          >
            <Text style={[styles.filterButtonText, filterStatus === 'PENDING' && styles.filterButtonTextActive]}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterStatus === 'FAILED' && styles.filterButtonActive]}
            onPress={() => setFilterStatus('FAILED')}
          >
            <Text style={[styles.filterButtonText, filterStatus === 'FAILED' && styles.filterButtonTextActive]}>Failed</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.transactionList}>
          {filteredTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <View style={styles.transactionType}>
                  <Ionicons 
                    name={getTransactionIcon(transaction.type)} 
                    size={24} 
                    color={colors.primary} 
                  />
                  <Text style={styles.transactionTypeText}>{transaction.type}</Text>
                </View>
                <Text style={[styles.transactionStatus, { color: getStatusColor(transaction.status) }]}>
                  {transaction.status}
                </Text>
              </View>
              
              <View style={styles.transactionInfo}>
                <Text style={styles.clientName}>{transaction.clientName}</Text>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>

              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.amountText,
                  { color: transaction.amount > 0 ? colors.status.success : colors.status.error }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} LYD
                </Text>
              </View>

              {transaction.status === 'PENDING' && (
                <View style={styles.transactionActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleTransactionAction(transaction.id, 'approve')}
                  >
                    <Ionicons name="checkmark-circle-outline" size={20} color={colors.status.success} />
                    <Text style={[styles.actionButtonText, styles.approveText]}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleTransactionAction(transaction.id, 'reject')}
                  >
                    <Ionicons name="close-circle-outline" size={20} color={colors.status.error} />
                    <Text style={[styles.actionButtonText, styles.rejectText]}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  transactionList: {
    flex: 1,
  },
  transactionCard: {
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
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionTypeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  transactionInfo: {
    marginBottom: 10,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  transactionAmount: {
    marginBottom: 10,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
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
  approveButton: {
    backgroundColor: colors.status.success + '10',
  },
  rejectButton: {
    backgroundColor: colors.status.error + '10',
  },
  approveText: {
    color: colors.status.success,
  },
  rejectText: {
    color: colors.status.error,
  },
}); 