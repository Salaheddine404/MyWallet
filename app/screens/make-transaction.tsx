import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useTransactionStore } from '../store/transactionStore';

export default function MakeTransactionScreen() {
  const router = useRouter();
  const { balance, updateBalance, addTransaction } = useTransactionStore();
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleTransaction = () => {
    // Validate inputs
    if (!beneficiaryName || !accountNumber || !amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    // Check if sufficient balance
    if (transactionAmount > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    // Update balance and add transaction
    updateBalance(transactionAmount);
    addTransaction({
      sender: 'Said Talibi', // This should come from user profile
      receiver: beneficiaryName,
      amount: transactionAmount,
      description: description || 'Transaction',
    });

    // Show success message
    Alert.alert(
      'Success',
      `Transaction of ${amount} MAD to ${beneficiaryName} completed successfully`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Clear the form
            setBeneficiaryName('');
            setAccountNumber('');
            setAmount('');
            setDescription('');
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Make Transaction</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Current Balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>{balance.toLocaleString()} MAD</Text>
          </View>

          {/* Beneficiary Name Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Beneficiary Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter beneficiary name"
              placeholderTextColor={colors.gray[400]}
              value={beneficiaryName}
              onChangeText={setBeneficiaryName}
            />
          </View>

          {/* Account Number Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account number"
              placeholderTextColor={colors.gray[400]}
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>

          {/* Amount Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <View style={styles.amountContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter amount"
                placeholderTextColor={colors.gray[400]}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              <Text style={styles.currency}>MAD</Text>
            </View>
          </View>

          {/* Description Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description (Optional)</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Add a description"
              placeholderTextColor={colors.gray[400]}
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleTransaction}
          >
            <Text style={styles.submitButtonText}>Confirm Transaction</Text>
          </TouchableOpacity>
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
  },
  formContainer: {
    padding: 20,
  },
  balanceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  balanceLabel: {
    color: colors.gray[400],
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    color: colors.white,
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  amountInput: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    paddingVertical: 15,
  },
  currency: {
    color: colors.gray[400],
    fontSize: 16,
    marginLeft: 10,
  },
  descriptionInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    color: colors.white,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 