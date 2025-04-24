import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchCardList } from "../services/cardlist";
import { changeCardStatus } from "../services/status";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { CardFront } from "../components/CardFront";
import { CardBack } from "../components/CardBack";

interface Card {
  card: string;
  pan?: string;
  expiry?: string;
  name_on_card?: string;
  cardstatus?: string;
  cvv?: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [showBack, setShowBack] = useState<{ [key: string]: boolean }>({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('Home Screen mounted with customerId:', customerId);
    
    // If no customerId, redirect to login
    if (!customerId) {
      console.error('No customerId provided, redirecting to login');
      router.replace('/');
      return;
    }

    loadCards();
  }, [customerId]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [cards]);

  async function loadCards() {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading cards for customerId:', customerId);
      const cardData = await fetchCardList(customerId);
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

  const handleStatusChange = async (card: Card, newStatus: boolean) => {
    if (!card.pan || !card.expiry) {
      Alert.alert("Error", "Missing card information");
      return;
    }

    try {
      setUpdatingStatus(card.pan);
      const status = newStatus ? "2" : "3";
      const success = await changeCardStatus(card.pan, card.expiry, status);
      
      if (success) {
        setCards(prevCards => 
          prevCards.map(c => 
            c.pan === card.pan 
              ? { ...c, cardstatus: newStatus ? "Active" : "Deactivated" }
              : c
          )
        );
        
        Alert.alert(
          "Success",
          `Card has been ${newStatus ? "activated" : "deactivated"} successfully`
        );
      } else {
        Alert.alert("Error", "Failed to change card status. Please try again.");
      }
    } catch (error) {
      console.error("Status change error:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const toggleCardView = (cardPan: string) => {
    setShowBack(prev => ({
      ...prev,
      [cardPan]: !prev[cardPan]
    }));
  };

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
        <TouchableOpacity style={styles.retryButton} onPress={loadCards}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💳 My Cards</Text>
        <Text style={styles.headerSubtitle}>Manage your payment methods easily</Text>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => card.pan && toggleCardView(card.pan)}
            style={styles.cardWrapper}
          >
            {showBack[card.pan || ''] ? (
              <CardBack
                cvv={card.cvv || 'XXX'}
                isActive={card.cardstatus === "Active"}
              />
            ) : (
              <CardFront
                cardNumber={card.pan || ''}
                cardHolder={card.name_on_card || ''}
                expiryDate={card.expiry || ''}
                isActive={card.cardstatus === "Active"}
              />
            )}
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  {
                    backgroundColor:
                      card.cardstatus === "Active" ? "#33AC2E" : "#e74c3c",
                  },
                ]}
                onPress={() => handleStatusChange(card, card.cardstatus !== "Active")}
                disabled={updatingStatus === card.pan}
              >
                {updatingStatus === card.pan ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Ionicons
                    name={card.cardstatus === "Active" ? "lock-open" : "lock-closed"}
                    size={20}
                    color="#fff"
                  />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>

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
    paddingTop: 50,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  cardWrapper: {
    margin: 15,
    marginTop: 10,
    position: 'relative',
  },
  cardActions: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  statusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addCardButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    margin: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  addCardText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
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
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
