import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Currency {
  name: string;
  code: string;
  flag: string;
  rate: number;
}

const currencies: Currency[] = [
  {
    name: 'US Dollar',
    code: 'USD',
    flag: '🇺🇸',
    rate: 10.15,
  },
  {
    name: 'Euro',
    code: 'EUR',
    flag: '🇪🇺',
    rate: 11.05,
  },
  {
    name: 'British Pound',
    code: 'GBP',
    flag: '🇬🇧',
    rate: 12.85,
  },
  {
    name: 'Swiss Franc',
    code: 'CHF',
    flag: '🇨🇭',
    rate: 11.75,
  },
  {
    name: 'Japanese Yen',
    code: 'JPY',
    flag: '🇯🇵',
    rate: 0.068,
  },
  {
    name: 'Canadian Dollar',
    code: 'CAD',
    flag: '🇨🇦',
    rate: 7.45,
  },
  {
    name: 'Australian Dollar',
    code: 'AUD',
    flag: '🇦🇺',
    rate: 6.65,
  },
];

export default function DevicesScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/background.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exchange Rates</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.flagCell]}>Currency</Text>
            <Text style={[styles.headerCell, styles.codeCell]}>Code</Text>
            <Text style={[styles.headerCell, styles.rateCell]}>Rate (MAD)</Text>
          </View>

          {currencies.map((currency, index) => (
            <View key={currency.code} style={styles.tableRow}>
              <View style={[styles.cell, styles.flagCell]}>
                <Text style={styles.flag}>{currency.flag}</Text>
                <Text style={styles.currencyName}>{currency.name}</Text>
              </View>
              <Text style={[styles.cell, styles.codeCell]}>{currency.code}</Text>
              <Text style={[styles.cell, styles.rateCell]}>{currency.rate.toFixed(2)}</Text>
            </View>
          ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  tableContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerCell: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  cell: {
    color: colors.white,
    fontSize: 16,
  },
  flagCell: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeCell: {
    flex: 1,
    textAlign: 'center',
  },
  rateCell: {
    flex: 1,
    textAlign: 'right',
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  currencyName: {
    color: colors.white,
    fontSize: 14,
  },
}); 