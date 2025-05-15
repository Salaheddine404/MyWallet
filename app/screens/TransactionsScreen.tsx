import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

// Mock data for transactions
const mockTransactions = [
  { id: '1', type: 'credit', amount: 500, description: 'Salary', date: '2024-03-20' },
  { id: '2', type: 'debit', amount: 100, description: 'Grocery Shopping', date: '2024-03-19' },
  { id: '3', type: 'debit', amount: 50, description: 'Coffee Shop', date: '2024-03-18' },
  { id: '4', type: 'credit', amount: 200, description: 'Refund', date: '2024-03-17' },
];

export default function TransactionsScreen() {
  const balance = 2500; // Mock balance

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        item.type === 'credit' ? styles.creditAmount : styles.debitAmount
      ]}>
        {item.type === 'credit' ? '+' : '-'}${Math.abs(item.amount)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>${balance}</Text>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <FlatList
          data={mockTransactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  balanceContainer: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 5,
  },
  balanceAmount: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  transactionsContainer: {
    flex: 1,
    padding: 20,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.text.primary,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditAmount: {
    color: colors.status.success,
  },
  debitAmount: {
    color: colors.status.error,
  },
}); 