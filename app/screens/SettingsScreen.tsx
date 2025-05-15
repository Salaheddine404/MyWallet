import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => router.push("/screens/TransactionsScreen")}
      >
        <View style={styles.menuItemContent}>
          <Ionicons name="swap-horizontal" size={24} color={colors.primary} />
          <Text style={styles.menuItemText}>My Transactions</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 15,
  },
});
