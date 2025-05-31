import React from 'react';
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
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setError("");
    setIsLoading(true);
    
    try {
      // Check for admin credentials
      if (customerId === '100001' && password === 'adm01') {
        // Navigate to admin dashboard
        router.replace('/(admin)/dashboard');
      } else {
        // Regular user login
        router.push({
          pathname: '/screens/home',
          params: { customerId }
        });
      }
    } catch (err) {
      console.error('Login error:', err);
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
        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.formContent}>
            <View style={styles.inputGroup}>
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
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
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
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formContent: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
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
    textAlign: 'center',
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
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: "center",
    fontSize: 12,
    marginTop: 20,
  },
});
