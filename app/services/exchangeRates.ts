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
      'MAD': '🇲🇦'
    };

    // Obtenir le taux USD/MAD
    const madRate = data.conversion_rates.MAD;
    
    // Convertir tous les taux en MAD
    const rates: ExchangeRate[] = Object.entries(data.conversion_rates)
      .filter(([currency]) => currency !== 'MAD')
      .map(([currency, rate]) => ({
        flag: currencyFlags[currency] || '🏳️',
        currency,
        value: ((rate as number) * madRate).toFixed(2) + ' MAD'
      }));

    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}; 