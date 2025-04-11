import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCardList } from "../services/api";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

interface Card {
  pan?: string;
  expiry?: string;
  name_on_card?: string;
  cardstatus?: string;
}

export default function HomeScreen() {
  const { customerId } = useLocalSearchParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showActive, setShowActive] = useState(true);

  useEffect(() => {
    async function loadCards() {
      try {
        setLoading(true);
        setError(null);
        const cardData = await fetchCardList(customerId as string);
        
        if (cardData && Array.isArray(cardData) && cardData.length > 0) {
          setCards(cardData);
        } else {
          setError("No cards found for this account.");
        }
      } catch (err) {
        console.error("Error loading cards:", err);
        setError("Failed to load cards. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (customerId) {
      loadCards();
    }
  }, [customerId]);

  const filteredCards = cards.filter(card => 
    showActive ? card.cardstatus === 'Active' : card.cardstatus === 'Deactivated'
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your cards...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color={colors.status.error} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cards</Text>
        <Text style={styles.headerSubtitle}>Manage your payment cards</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Show {showActive ? 'Active' : 'Deactivated'} Cards</Text>
          <Switch
            value={showActive}
            onValueChange={setShowActive}
            trackColor={{ false: colors.gray[400], true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      {filteredCards.map((card, index) => (
        <View 
          key={index} 
          style={[
            styles.cardContainer,
            { backgroundColor: card.cardstatus === 'Active' ? colors.primary : colors.gray[400] }
          ]}
        >
          <View style={styles.cardHeader}>
            <Ionicons 
              name="card" 
              size={32} 
              color={colors.white} 
            />
          </View>

          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>
              {card.pan || '•••• •••• •••• ••••'}
            </Text>
            <Text style={styles.cardName}>{card.name_on_card || 'Card Holder'}</Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardLabel}>VALID THRU</Text>
              <Text style={styles.cardValue}>{card.expiry || 'N/A'}</Text>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addCardButton}>
        <Ionicons name="add-circle" size={24} color={colors.primary} />
        <Text style={styles.addCardText}>Add New Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 25,
    margin: 15,
    marginTop: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    minHeight: 220,
    aspectRatio: 1.6,
    width: '90%',
    alignSelf: 'center',
  },
  cardHeader: {
    marginBottom: 40,
  },
  cardNumberContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  cardNumber: {
    fontSize: 28,
    color: colors.white,
    letterSpacing: 3,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 10,
    color: colors.white,
    opacity: 0.7,
    marginBottom: 5,
    letterSpacing: 1.5,
  },
  cardValue: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    margin: 15,
    marginTop: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addCardText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: colors.status.error,
    textAlign: "center",
    marginTop: 10,
  },
  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.white + '20',
    borderRadius: 10,
    padding: 10,
  },
  switchLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
}); 