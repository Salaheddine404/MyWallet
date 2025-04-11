import { View, Text, StyleSheet } from "react-native";

export default function CardItem({ card }: { card: any }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{card.name_on_card}</Text>
      <Text>{card.pan}</Text>
      <Text>Status: {card.cardstatus}</Text>
      <Text>Type: {card.cardtype}</Text>
      <Text>Expiry: {card.expiry}</Text>
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
