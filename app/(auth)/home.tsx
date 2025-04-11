import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCardList, changeCardStatus } from "../services/api";
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
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

  const handleStatusChange = async (card: Card, newStatus: boolean) => {
    if (!card.pan || !card.expiry) {
      Alert.alert("Error", "Missing card information");
      return;
    }

    try {
      setUpdatingStatus(card.pan);
      const status = newStatus ? "2" : "5";
      const success = await changeCardStatus(card.pan, card.expiry, status);
      if (success) {
        await loadCards();
        Alert.alert(
          "Success",
          `Card has been ${newStatus ? "activated" : "deactivated"} successfully`
        );
      } else {
        Alert.alert("Error", "Failed to change card status. Please try again.");
      }
    } catch (error) {
      console.error("Status change error:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredCards = cards.filter((card) =>
    showActive ? card.cardstatus === "Active" : card.cardstatus === "Deactivated"
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
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {showActive ? "Showing Active Cards" : "Showing Deactivated Cards"}
          </Text>
          <Switch
            value={showActive}
            onValueChange={setShowActive}
            trackColor={{ false: "#ccc", true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        {filteredCards.map((card, index) => (
          <View
            key={index}
            style={[
              styles.cardContainer,
              {
                backgroundColor:
                  card.cardstatus === "Active" ? colors.primary : colors.gray[400],
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="card-outline" size={30} color={colors.white} />
              <View style={styles.statusSwitchContainer}>
                <Text style={styles.statusLabel}>
                  {card.cardstatus === "Active" ? "Active" : "Deactivated"}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.lockButton,
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
            </View>

            <View style={styles.cardNumberContainer}>
              <Text style={styles.cardNumber}>
                {card.pan || "•••• •••• •••• ••••"}
              </Text>
              <Text style={styles.cardName}>
                {card.name_on_card || "Card Holder"}
              </Text>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>VALID THRU</Text>
                <Text style={styles.cardValue}>{card.expiry || "N/A"}</Text>
              </View>
            </View>
          </View>
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
  switchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white + "20",
    padding: 10,
    borderRadius: 15,
  },
  switchLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
  cardContainer: {
    borderRadius: 20,
    padding: 25,
    margin: 15,
    marginTop: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 200,
    width: "90%",
    alignSelf: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  cardNumberContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  cardNumber: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 2,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.7,
    marginBottom: 4,
    letterSpacing: 1.2,
  },
  cardValue: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
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
  statusSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white + "30",
    padding: 8,
    borderRadius: 15,
  },
  statusLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 10,
  },
  lockButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
