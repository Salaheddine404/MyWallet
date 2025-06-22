import { View, FlatList, Text, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCardList } from "../services/cardlist";
import CardItem from "../components/CardItem";
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
      <ImageBackground
        source={require('../../assets/images/homescreenback.webp')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground
        source={require('../../assets/images/homescreenback.webp')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/homescreenback.webp')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            data={cards}
            keyExtractor={(item) => item.card.toString()}
            renderItem={({ item, index }) => <CardItem card={item} index={index} />}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Text style={styles.emptyText}>No cards available</Text>
              </View>
            }
          />
        </View>
      </View>
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
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    padding: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  emptyText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    padding: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
