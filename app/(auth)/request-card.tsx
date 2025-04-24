import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { requestDebitCard } from '../services/debiCard';

export default function RequestCardScreen() {
  const router = useRouter();
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    operation: 'ADD',
    customerid: customerId || '',
    accountnumber: '',
    cardprogramcode: '839',
    nameoncard: '',
    firstname: '',
    middlename: '',
    lastname: '',
    customertype: 'N',
    accounttype: 'N',
    currencycode: '132',
    phonenumber: '',
    branchcode: '5',
    nationalid: '',
    nationalidtype: '1',
    birthdate: '',
    institution: '7601',
    bankaccounttype: '2821',
    profetionalposition: '1',
    gender: 'F',
    debitprogram: '7241',
    addresstype: '2',
    zipaddress: '',
    fax: '',
    language: '2',
    corporatename: 'OpenArt',
    destination: '99'
  });

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.nameoncard || !formData.firstname || !formData.lastname || 
        !formData.phonenumber || !formData.nationalid || !formData.birthdate || 
        !formData.zipaddress) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await requestDebitCard(formData);
      
      if (response.status.codestatus === '2') {
        Alert.alert(
          'Success',
          'Card requested successfully',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } else {
        Alert.alert('Error', response.status.msgerror || 'Failed to request card');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to request card. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request New Card</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name on Card *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name as it should appear on card"
            value={formData.nameoncard}
            onChangeText={(text) => setFormData({ ...formData, nameoncard: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            value={formData.firstname}
            onChangeText={(text) => setFormData({ ...formData, firstname: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            value={formData.lastname}
            onChangeText={(text) => setFormData({ ...formData, lastname: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={formData.phonenumber}
            onChangeText={(text) => setFormData({ ...formData, phonenumber: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>National ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter national ID"
            value={formData.nationalid}
            onChangeText={(text) => setFormData({ ...formData, nationalid: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Birth Date *</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={formData.birthdate}
            onChangeText={(text) => setFormData({ ...formData, birthdate: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>ZIP Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ZIP code"
            value={formData.zipaddress}
            onChangeText={(text) => setFormData({ ...formData, zipaddress: text })}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Text style={styles.submitButtonText}>Request Card</Text>
              <Ionicons name="card" size={20} color={colors.white} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
}); 