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
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { requestDebitCard } from '../services/debiCard';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RequestCardScreen() {
  const router = useRouter();
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '/');
      setFormData({
        ...formData,
        initiator: { ...formData.initiator, birthdate: formattedDate }
      });
    }
  };

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
      source={require('../../assets/images/back2.webp')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <View style={styles.header}>
              <Ionicons name="card" size={32} color={colors.primary} />
              <Text style={styles.sectionTitle}>Request New Card</Text>
            </View>
            
            <View style={styles.content}>
              <View style={styles.instructionsContainer}>
                <Ionicons name="information-circle" size={20} color={colors.primary} />
                <Text style={styles.instructions}>
                  Please fill in the following details to request a new card. Fields marked with * are required.
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Name on Card *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person" size={20} color={colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter name as it should appear on card"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.initiator.nameoncard}
                    onChangeText={(text) => setFormData({ 
                      ...formData, 
                      initiator: { ...formData.initiator, nameoncard: text.toUpperCase() } 
                    })}
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>First Name *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color={colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter first name"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.initiator.firstname}
                    onChangeText={(text) => setFormData({ 
                      ...formData, 
                      initiator: { ...formData.initiator, firstname: text } 
                    })}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Last Name *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color={colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter last name"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.initiator.lastname}
                    onChangeText={(text) => setFormData({ 
                      ...formData, 
                      initiator: { ...formData.initiator, lastname: text } 
                    })}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="call" size={20} color={colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    keyboardType="phone-pad"
                    value={formData.initiator.phonenumber}
                    onChangeText={(text) => setFormData({ 
                      ...formData, 
                      initiator: { ...formData.initiator, phonenumber: text } 
                    })}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>National ID *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="card" size={20} color={colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter national ID"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.initiator.nationalid}
                    onChangeText={(text) => setFormData({ 
                      ...formData, 
                      initiator: { ...formData.initiator, nationalid: text } 
                    })}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Birth Date *</Text>
                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Ionicons name="calendar" size={20} color={colors.primary} style={styles.inputIcon} />
                  <Text style={[
                    styles.input,
                    !formData.initiator.birthdate && styles.placeholderText
                  ]}>
                    {formData.initiator.birthdate || 'Select birth date'}
                  </Text>
                  <Ionicons 
                    name="chevron-down" 
                    size={20} 
                    color={colors.primary} 
                    style={styles.datePickerIcon} 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>ZIP Address *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="location" size={20} color={colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter ZIP code"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.initiator.zipaddress}
                    onChangeText={(text) => setFormData({ 
                      ...formData, 
                      initiator: { ...formData.initiator, zipaddress: text } 
                    })}
                  />
                </View>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {Platform.OS === 'ios' ? (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                textColor={colors.primary}
                style={styles.iosDatePicker}
              />
              <TouchableOpacity
                style={styles.iosDatePickerButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.iosDatePickerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 15,
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },
  instructions: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    paddingVertical: 12,
    paddingRight: 12,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  datePickerIcon: {
    padding: 12,
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  iosDatePicker: {
    height: 200,
  },
  iosDatePickerButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  iosDatePickerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 