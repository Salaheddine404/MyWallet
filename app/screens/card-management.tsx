import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchCardList } from '../services/cardlist';
import { changeCardStatus } from '../services/status';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface Card {
  card: string;
  pan: string;
  name_on_card: string;
  status: string;
  expiry_date: string;
  card_type: string;
}

export default function CardManagementScreen() {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCardList(customerId as string);
      setCards(data);
    } catch (err) {
      setError('Failed to load cards.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeclareMissing = async (card: Card) => {
    setProcessing((prev) => ({ ...prev, [card.card]: true }));
    try {
      await changeCardStatus(card.pan, card.expiry_date, 'INACTIVE');
      Alert.alert('Card Declared Missing', 'Your card has been deactivated. Please contact support for a replacement.');
      setCards((prev) => prev.map((c) => c.card === card.card ? { ...c, status: 'INACTIVE' } : c));
    } catch (err) {
      Alert.alert('Error', 'Failed to declare card as missing.');
    } finally {
      setProcessing((prev) => ({ ...prev, [card.card]: false }));
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/back1.webp')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Management</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading cards...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <View style={styles.cardsList}>
              {cards.map((card, idx) => {
                const isLast = idx === cards.length - 1;
                const isProcessing = processing[card.card];
                const isActive = card.status === 'ACTIVE';
                const buttonEnabled = isLast ? !isProcessing : (isActive && !isProcessing);
                const buttonStyle = [
                  styles.actionButton,
                  (!buttonEnabled || isProcessing) && styles.disabledButton
                ];
                return (
                  <View key={card.card} style={styles.cardBox}>
                    <View style={styles.cardRow}>
                      <Ionicons name="card-outline" size={32} color={colors.primary} style={{ marginRight: 12 }} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cardPan}>{card.pan}</Text>
                        <Text style={styles.cardType}>{card.card_type}</Text>
                      </View>
                      <Text style={[styles.cardStatus, { color: isActive ? colors.status.success : colors.status.error }]}> 
                        {isActive ? 'Activated' : 'Deactivated'}
                      </Text>
                    </View>
                    <View style={styles.cardDetailsRow}>
                      <Text style={styles.cardLabel}>Name:</Text>
                      <Text style={styles.cardValue}>{card.name_on_card}</Text>
                      <Text style={styles.cardLabel}>Expiry:</Text>
                      <Text style={styles.cardValue}>{card.expiry_date}</Text>
                    </View>
                    <TouchableOpacity
                      style={buttonStyle}
                      onPress={() => handleDeclareMissing(card)}
                      disabled={!buttonEnabled}
                    >
                      <Ionicons name="alert-circle" size={20} color={colors.white} />
                      <Text style={styles.actionButtonText}>I miss my card</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
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
  container: {
    flex: 1,
    paddingTop: 60,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 1,
  },
  loadingText: {
    color: colors.text.primary,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
  cardsList: {
    gap: 24,
  },
  cardBox: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    padding: 24,
    marginBottom: 0,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardPan: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 2,
  },
  cardType: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 1,
  },
  cardStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 2,
    gap: 8,
  },
  cardLabel: {
    fontSize: 15,
    color: colors.gray[200],
    fontWeight: '600',
    marginRight: 2,
  },
  cardValue: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
    marginRight: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.status.error,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  actionButtonText: {
    color: colors.white,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: colors.gray[400],
  },
}); 