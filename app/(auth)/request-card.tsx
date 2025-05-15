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
  ImageBackground,
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
    initiator: {
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
    }
  });

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.initiator.nameoncard || !formData.initiator.firstname || !formData.initiator.lastname || 
        !formData.initiator.phonenumber || !formData.initiator.nationalid || !formData.initiator.birthdate || 
        !formData.initiator.zipaddress) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await requestDebitCard(formData);
      
      if (response.status.codestatus === '2') {
        Alert.alert(
          'Success',
          'Your card request has been submitted successfully. You will receive your new card within 5-7 business days.',
          [{ 
            text: 'OK', 
            onPress: () => router.push({
              pathname: "/(auth)/home",
              params: { customerId }
            })
          }]
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
    <ImageBackground
      source={require('../../assets/images/background.webp')}
      style={styles.backgroundImage}
    >
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
          <Text style={styles.instructions}>
            Please fill in the following details to request a new card. Fields marked with * are required.
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Name on Card *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name as it should appear on card"
              value={formData.initiator.nameoncard}
              onChangeText={(text) => setFormData({ 
                ...formData, 
                initiator: { ...formData.initiator, nameoncard: text.toUpperCase() } 
              })}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={formData.initiator.firstname}
              onChangeText={(text) => setFormData({ 
                ...formData, 
                initiator: { ...formData.initiator, firstname: text } 
              })}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={formData.initiator.lastname}
              onChangeText={(text) => setFormData({ 
                ...formData, 
                initiator: { ...formData.initiator, lastname: text } 
              })}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={formData.initiator.phonenumber}
              onChangeText={(text) => setFormData({ 
                ...formData, 
                initiator: { ...formData.initiator, phonenumber: text } 
              })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>National ID *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter national ID"
              value={formData.initiator.nationalid}
              onChangeText={(text) => setFormData({ 
                ...formData, 
                initiator: { ...formData.initiator, nationalid: text } 
              })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Birth Date *</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={formData.initiator.birthdate}
              onChangeText={(text) => setFormData({ 
                ...formData, 
                initiator: { ...formData.initiator, birthdate: text } 
              })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>ZIP Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter ZIP code"
              value={formData.initiator.zipaddress}
              onChangeText={(text) => setFormData({ 
                ...formData, 
                initiator: { ...formData.initiator, zipaddress: text } 
              })}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.9,
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
    padding: 20,
  },
  instructions: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
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