import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCardList } from "../services/api";
import CardItem from "../components/CardItem";
import Navbar from "../components/Navbar";
import { colors } from "../theme/colors";

interface Card {
  card: string;
  // Add other card properties as needed
}

export default function HomeScreen() {
  const { customerId } = useLocalSearchParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) {
      setError("No customer ID provided");
      setLoading(false);
      return;
    }

    const loadCards = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedCards = await fetchCardList(customerId as string);
        if (fetchedCards && fetchedCards.length > 0) {
          setCards(fetchedCards);
        } else {
          setError("No cards found for this customer");
        }
      } catch (err) {
        setError("Failed to load cards. Please try again later.");
        console.error("Error loading cards:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, [customerId]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.card.toString()}
          renderItem={({ item }) => <CardItem card={item} />}
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>No cards available</Text>
            </View>
          }
        />
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: colors.status.error,
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  emptyText: {
    color: colors.text.secondary,
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});
