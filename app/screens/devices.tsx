import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { getExchangeRates, ExchangeRate } from '../services/exchangeRates';

export default function DevisesScreen() {
  const router = useRouter();
  const [currencies, setCurrencies] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadExchangeRates = async () => {
    try {
      setError(null);
      const rates = await getExchangeRates();
      setCurrencies(rates);
    } catch (err) {
      setError('Failed to load exchange rates. Please try again.');
      console.error('Error loading exchange rates:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadExchangeRates();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadExchangeRates();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/back3.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exchange Rates</Text>
      </View>

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.white}
            colors={[colors.white]}
          />
        }
      >
        <View style={styles.section}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.white} />
              <Text style={styles.loadingText}>Loading exchange rates...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={48} color={colors.status.error} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={loadExchangeRates}>
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
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
                  <Text style={styles.headerCell}>Value (LYD)</Text>
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
          )}
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
    paddingTop: 60,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: colors.white,
    fontSize: 16,
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  tableContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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