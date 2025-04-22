import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!customerId.trim()) {
      setError("Please enter your customer ID");
      return;
    }
    if (password !== "1234") {
      setError("Invalid password. Please use '1234'");
      return;
    }

    setError("");
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push({
        pathname: "/(auth)/home",
        params: { customerId },
      });
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Ionicons name="card" size={48} color={colors.white} />
            </View>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Access your Bolt Bank card details
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.formContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Customer ID</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your customer ID"
                  placeholderTextColor={colors.gray[400]}
                  value={customerId}
                  onChangeText={(text) => {
                    setCustomerId(text);
                    setError("");
                  }}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoFocus
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter password (1234)"
                  placeholderTextColor={colors.gray[400]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>
                    Continue
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color={colors.white} />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>
                Forgot your Customer ID?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerText}>
          © 2025 Bolt Bank. All rights reserved.
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
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    alignItems: "center",
    position: 'relative',
    zIndex: 1,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  formContent: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.primary,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    paddingHorizontal: 15,
    height: 50,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 14,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  forgotButton: {
    marginTop: 20,
    alignItems: "center",
  },
  forgotText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: "center",
    fontSize: 12,
    marginBottom: 20,
  },
});
