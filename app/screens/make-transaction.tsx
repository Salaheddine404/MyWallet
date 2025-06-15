import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useTransactionStore } from '../store/transactionStore';
import TransactionConfirmation from '../components/TransactionConfirmation';

export default function MakeTransactionScreen() {
  const router = useRouter();
  const { balance, updateBalance, addTransaction } = useTransactionStore();
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'success' | 'error'>('success');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationSubMessage, setConfirmationSubMessage] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleTransaction = () => {
    // Validate inputs
    if (!beneficiaryName || !accountNumber || !amount) {
      setConfirmationType('error');
      setConfirmationMessage('Missing Information');
      setConfirmationSubMessage('Please fill in all required fields');
      setShowConfirmation(true);
      return;
    }

    if (accountNumber.length !== 14) {
      setConfirmationType('error');
      setConfirmationMessage('Invalid Account Number');
      setConfirmationSubMessage('Please enter a valid 14-digit account number');
      setShowConfirmation(true);
      return;
    }

    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      setConfirmationType('error');
      setConfirmationMessage('Invalid Amount');
      setConfirmationSubMessage('Please enter a valid amount greater than 0');
      setShowConfirmation(true);
      return;
    }

    if (transactionAmount > balance) {
      setConfirmationType('error');
      setConfirmationMessage('Insufficient Balance');
      setConfirmationSubMessage('You don\'t have enough funds to complete this transaction');
      setShowConfirmation(true);
      return;
    }

    setConfirmationType('success');
    setConfirmationMessage('Confirm Transaction');
    setConfirmationSubMessage(`Are you sure you want to send ${amount} MAD to ${beneficiaryName}?`);
    setShowConfirmation(true);
  };

  const handleConfirmTransaction = () => {
    if (confirmationType === 'error') {
      // If it's an error, just close the confirmation dialog
      setShowConfirmation(false);
      return;
    }

    // Only proceed with transaction if it's a success confirmation
    updateBalance(parseFloat(amount));
    addTransaction({
      sender: 'Said Talibi', // This should come from user profile
      receiver: beneficiaryName,
      amount: parseFloat(amount),
      description: description || 'Transaction',
      accountNumber: accountNumber,
    });

    // Clear the form and navigate back
    setBeneficiaryName('');
    setAccountNumber('');
    setAmount('');
    setDescription('');
    setShowConfirmation(false);
    handleBack();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/back1.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Make Transaction</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Current Balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>{balance.toLocaleString()} LYD</Text>
          </View>

          {/* Beneficiary Name Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Beneficiary Name</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={24} color={colors.gray[300]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter beneficiary name"
                placeholderTextColor={colors.gray[400]}
                value={beneficiaryName}
                onChangeText={setBeneficiaryName}
              />
            </View>
          </View>

          {/* Account Number Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Number</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={24} color={colors.gray[300]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter 14-digit account number"
                placeholderTextColor={colors.gray[400]}
                keyboardType="numeric"
                value={accountNumber}
                onChangeText={(text) => setAccountNumber(text.replace(/[^0-9]/g, '').slice(0, 14))}
                maxLength={14}
              />
            </View>
          </View>

          {/* Amount Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="cash-outline" size={24} color={colors.gray[300]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor={colors.gray[400]}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ''))}
              />
              <Text style={styles.currency}>LYD</Text>
            </View>
          </View>

          {/* Description Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description (Optional)</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="document-text-outline" size={24} color={colors.gray[300]} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Add a description"
                placeholderTextColor={colors.gray[400]}
                multiline
                value={description}
                onChangeText={setDescription}
              />
            </View>
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

      <TransactionConfirmation
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmTransaction}
        type={confirmationType}
        message={confirmationMessage}
        subMessage={confirmationSubMessage}
      />
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    paddingVertical: 15,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  currency: {
    color: colors.gray[400],
    fontSize: 16,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 