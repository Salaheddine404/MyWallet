import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!customerId.trim()) {
      setError("Please enter your customer ID");
      return;
    }
    setError("");
    router.push({
      pathname: "/(auth)/home",
      params: { customerId },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="wallet" size={60} color={colors.white} />
          <Text style={styles.appName}>MyWallet</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome to your digital banking</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-circle" size={24} color={colors.gray[400]} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your customer ID"
            placeholderTextColor={colors.gray[400]}
            value={customerId}
            onChangeText={setCustomerId}
            keyboardType="numeric"
            autoCapitalize="none"
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
          <Ionicons name="arrow-forward" size={24} color={colors.white} />
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Need help? Contact our support team
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.text.primary,
  },
  errorText: {
    color: colors.status.error,
    marginBottom: 15,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  helpText: {
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});
