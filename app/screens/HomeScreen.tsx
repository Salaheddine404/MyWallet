import { View, FlatList, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchCardList } from "../services/api";
import CardItem from "../components/CardItem";
import Navbar from "../components/Navbar";

interface Card {
  card: string;
  // Add other card properties as needed
}

export default function HomeScreen() {
  const { customerId } = useLocalSearchParams();
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetchCardList(customerId as string).then(setCards);
  }, [customerId]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.card.toString()}
          renderItem={({ item }) => <CardItem card={item} />}
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
});
