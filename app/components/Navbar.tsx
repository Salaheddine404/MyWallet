import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Navbar() {
  const router = useRouter();
  const { customerId } = useLocalSearchParams();

  const navigateTo = (screen: string) => {
    router.push({
      pathname: `/${screen}`,
      params: { customerId }
    });
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo("home")}
      >
        <Ionicons name="home" size={24} color="#000" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo("profile")}
      >
        <Ionicons name="person" size={24} color="#000" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo("transactions")}
      >
        <Ionicons name="list" size={24} color="#000" />
        <Text style={styles.navText}>Transactions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo("settings")}
      >
        <Ionicons name="settings" size={24} color="#000" />
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
}); 