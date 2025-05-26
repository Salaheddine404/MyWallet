import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

// Mock data for transactions
const mockTransactions: Transaction[] = [
  { id: '1', type: 'credit', amount: 500, description: 'Salary', date: '2024-03-20' },
  { id: '2', type: 'debit', amount: 100, description: 'Grocery Shopping', date: '2024-03-19' },
  { id: '3', type: 'debit', amount: 50, description: 'Coffee Shop', date: '2024-03-18' },
  { id: '4', type: 'credit', amount: 200, description: 'Refund', date: '2024-03-17' },
];

export default function TransactionsScreen() {
  const { customerId } = useLocalSearchParams();
  const router = useRouter();
  const balance = 2500; // Mock balance

  const renderTransaction = ({ item }: { item: Transaction }) => (
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
    <ImageBackground
      source={require('../../assets/images/background.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transaction History</Text>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>${balance}</Text>
        </View>

        <View style={styles.transactionsContainer}>
          <FlatList
            data={mockTransactions}
            renderItem={renderTransaction}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.transactionsList}
          />
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  balanceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    marginTop: 0,
    borderRadius: 15,
    padding: 15,
  },
  transactionsList: {
    paddingBottom: 20,
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