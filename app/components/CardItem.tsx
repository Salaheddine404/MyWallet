import { View, Text, StyleSheet } from "react-native";

export default function CardItem({ card, index }: { card: any, index?: number }) {
  // Override expiry for the first three cards
  let expiry = card.expiry_date;
  if (typeof index === 'number') {
    if (index === 0) expiry = '06/26';
    else if (index === 1) expiry = '21/28';
    else if (index === 2) expiry = '02/28';
  }
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{card.name_on_card}</Text>
      <Text>{card.pan}</Text>
      <Text>Status: {card.status}</Text>
      <Text>Type: {card.card_type}</Text>
      <Text>Expiry: {expiry}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
