import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCardList } from "../services/api";
import CardItem from "../components/CardItem";

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
    async function loadCards() {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching cards for customer:", customerId); // Debug log
        const cardList = await fetchCardList(customerId as string);
        console.log("Received cards:", cardList); // Debug log
        if (cardList && cardList.length > 0) {
          setCards(cardList);
        } else {
          setError("No cards found for this customer.");
        }
      } catch (err) {
        console.error("Error in loadCards:", err); // Debug log
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
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading cards...</Text>
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
        />
      </View>
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
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
}); 