import { colors } from '../theme/colors';

const API_KEY = 'a3ed46ef991fd6c0173cd326'; // Nouvelle clé API fonctionnelle
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export interface ExchangeRate {
  flag: string;
  currency: string;
  value: string;
}

export const getExchangeRates = async (): Promise<ExchangeRate[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/USD`);
    const data = await response.json();

    if (data.result !== 'success') {
      throw new Error('Failed to fetch exchange rates');
    }

    // Map des devises avec leurs drapeaux
    const currencyFlags: { [key: string]: string } = {
      'EUR': '🇪🇺',
      'USD': '🇺🇸',
      'GBP': '🇬🇧',
      'CHF': '🇨🇭',
      'AED': '🇦🇪',
      'SAR': '🇸🇦',
      'QAR': '🇶🇦',
      'KWD': '🇰🇼',
      'BHD': '🇧🇭',
      'OMR': '🇴🇲',
      'JPY': '🇯🇵',
      'CNY': '🇨🇳',
      'CAD': '🇨🇦',
      'AUD': '🇦🇺',
      'NZD': '🇳🇿',
      'LYD': '🇱🇾'
    };

    // Get USD/LYD rate
    const lydRate = data.conversion_rates.LYD;
    
    // Convert all rates to LYD
    const rates: ExchangeRate[] = Object.entries(data.conversion_rates)
      .filter(([currency]) => currency !== 'LYD')
      .map(([currency, rate]) => ({
        flag: currencyFlags[currency] || '🏳️',
        currency,
        value: ((rate as number) * lydRate).toFixed(2) + ' LYD'
      }));

    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}; 