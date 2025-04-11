import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [customerId, setCustomerId] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (customerId) {
      router.replace({
        pathname: "/(auth)/home",
        params: { customerId }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer ID</Text>
      <TextInput
        style={styles.input}
        value={customerId}
        onChangeText={setCustomerId}
        placeholder="Enter your customer ID"
        keyboardType="numeric"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
