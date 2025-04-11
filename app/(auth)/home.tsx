import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCardList } from "../services/api";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

interface Card {
  cardno?: string;
  cardtype?: string;
  status?: string;
  expirydate?: string;
}

export default function HomeScreen() {
  const { customerId } = useLocalSearchParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      </View>

      {cards.map((card, index) => (
        <View key={index} style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Ionicons 
              name={card.cardtype?.toLowerCase().includes('visa') ? 'logo-visa' : 'card'} 
              size={32} 
              color={colors.white} 
            />
            <View style={styles.cardStatus}>
              <View style={[
                styles.statusDot,
                { backgroundColor: card.status === 'ACTIVE' ? colors.status.success : colors.status.warning }
              ]} />
              <Text style={styles.statusText}>{card.status || 'UNKNOWN'}</Text>
            </View>
          </View>

          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>
              {card.cardno ? `•••• •••• •••• ${card.cardno.slice(-4)}` : '•••• •••• •••• ••••'}
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>{card.expirydate || 'N/A'}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardLabel}>Type</Text>
              <Text style={styles.cardValue}>{card.cardtype || 'Unknown'}</Text>
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
    borderRadius: 15,
    padding: 20,
    margin: 15,
    marginTop: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white + "20",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  cardNumberContainer: {
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 24,
    color: colors.white,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.7,
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "500",
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
}); 