import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function DevicesScreen() {
  const router = useRouter();

  const currencies = [
    {
      flag: '🇪🇺',
      currency: 'EUR',
      value: '11.25 MAD'
    },
    {
      flag: '🇺🇸',
      currency: 'USD',
      value: '10.15 MAD'
    },
    {
      flag: '🇬🇧',
      currency: 'GBP',
      value: '12.85 MAD'
    },
    {
      flag: '🇨🇭',
      currency: 'CHF',
      value: '11.45 MAD'
    },
    {
      flag: '🇦🇪',
      currency: 'AED',
      value: '2.76 MAD'
    },
    {
      flag: '🇸🇦',
      currency: 'SAR',
      value: '2.70 MAD'
    },
    {
      flag: '🇶🇦',
      currency: 'QAR',
      value: '2.78 MAD'
    },
    {
      flag: '🇰🇼',
      currency: 'KWD',
      value: '33.15 MAD'
    },
    {
      flag: '🇧🇭',
      currency: 'BHD',
      value: '26.95 MAD'
    },
    {
      flag: '🇴🇲',
      currency: 'OMR',
      value: '26.35 MAD'
    },
    {
      flag: '🇯🇵',
      currency: 'JPY',
      value: '0.068 MAD'
    },
    {
      flag: '🇨🇳',
      currency: 'CNY',
      value: '1.42 MAD'
    },
    {
      flag: '🇨🇦',
      currency: 'CAD',
      value: '7.45 MAD'
    },
    {
      flag: '🇦🇺',
      currency: 'AUD',
      value: '6.75 MAD'
    },
    {
      flag: '🇳🇿',
      currency: 'NZD',
      value: '6.25 MAD'
    }
  ];

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

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.flagHeaderContainer}>
                <Text style={styles.headerCell}>Flag</Text>
              </View>
              <View style={styles.currencyHeaderContainer}>
                <Text style={styles.headerCell}>Currency</Text>
              </View>
              <View style={styles.valueHeaderContainer}>
                <Text style={styles.headerCell}>Value (MAD)</Text>
              </View>
            </View>

            {/* Table Rows */}
            {currencies.map((item, index) => (
              <View key={index} style={[
                styles.tableRow,
                index === currencies.length - 1 && styles.lastRow
              ]}>
                <View style={styles.flagContainer}>
                  <Text style={styles.flagText}>{item.flag}</Text>
                </View>
                <View style={styles.currencyContainer}>
                  <Text style={styles.currencyText}>{item.currency}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
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
  section: {
    padding: 20,
  },
  tableContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  headerCell: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flagHeaderContainer: {
    width: '20%',
    alignItems: 'center',
  },
  currencyHeaderContainer: {
    width: '30%',
    alignItems: 'center',
  },
  valueHeaderContainer: {
    width: '50%',
    alignItems: 'center',
  },
  flagContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagText: {
    fontSize: 32,
  },
  currencyText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '500',
  }
}); 