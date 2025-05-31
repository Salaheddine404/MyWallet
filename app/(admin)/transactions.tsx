import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

// Mock data for demonstration
const transactions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  sender: `Client ${i + 1}`,
  receiver: `Client ${Math.floor(Math.random() * 50) + 1}`,
  amount: (Math.random() * 10000).toFixed(2),
  date: `${Math.floor(Math.random() * 24)} hours ago`,
  status: ['Completed', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
}));

export default function TransactionsScreen() {
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

        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Sender</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Receiver</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Amount</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
        </View>

        <ScrollView style={styles.tableContent}>
          {transactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={styles.tableRow}
              onPress={() => {/* Handle transaction details */}}
            >
              <Text style={[styles.cell, { flex: 2 }]}>{transaction.sender}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{transaction.receiver}</Text>
              <Text style={[styles.cell, { flex: 1, color: colors.primary }]}>
                MAD {transaction.amount}
              </Text>
              <View style={[styles.cell, { flex: 1 }]}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: transaction.status === 'Completed' ? colors.status.success + '20' : 
                    transaction.status === 'Pending' ? colors.status.warning + '20' : 
                    colors.status.error + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: transaction.status === 'Completed' ? colors.status.success : 
                      transaction.status === 'Pending' ? colors.status.warning : 
                      colors.status.error }
                  ]}>
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  tableContent: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  cell: {
    fontSize: 14,
    color: colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 