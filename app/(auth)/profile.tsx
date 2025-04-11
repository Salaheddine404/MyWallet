import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProfileScreen() {
  const { customerId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Customer ID:</Text>
        <Text style={styles.value}>{customerId}</Text>
      </View>
      {/* Add more customer information here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
  },
}); 