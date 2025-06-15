import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useTransactionStore } from '../store/transactionStore';

export default function ReceiversScreen() {
  const router = useRouter();
  const { transactions } = useTransactionStore();

  return (
    <ImageBackground
      source={require('../../assets/images/back1.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beneficiaries</Text>
      </View>

      <View style={styles.container}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.headerCell, { flex: 2 }]}>
            <Text style={styles.headerText}>Sender</Text>
          </View>
          <View style={[styles.headerCell, { flex: 2 }]}>
            <Text style={styles.headerText}>Receiver</Text>
          </View>
          <View style={[styles.headerCell, { flex: 1 }]}>
            <Text style={styles.headerText}>Amount</Text>
          </View>
        </View>

        {/* Table Content */}
        <ScrollView style={styles.tableContent}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.tableRow}>
              <View style={[styles.cell, { flex: 2 }]}>
                <Text style={styles.cellText}>{transaction.sender}</Text>
              </View>
              <View style={[styles.cell, { flex: 2 }]}>
                <Text style={styles.cellText}>{transaction.receiver}</Text>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.cellText}>{transaction.amount} LYD</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  headerCell: {
    paddingHorizontal: 10,
  },
  headerText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContent: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 8,
  },
  cell: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  cellText: {
    color: colors.white,
    fontSize: 14,
  },
}); 