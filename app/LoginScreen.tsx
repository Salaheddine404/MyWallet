import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from './theme/colors';

export default function LoginScreen() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!customerId || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual login logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.replace({
        pathname: "/(auth)/home",
        params: { customerId }
      });
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push({
      pathname: "/forgot-password"
    });
  };

  const handleForgotCustomerId = () => {
    router.push({
      pathname: "/forgot-customer-id"
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Customer ID"
              value={customerId}
              onChangeText={setCustomerId}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.forgotLinksContainer}>
              <TouchableOpacity
                style={styles.forgotLink}
                onPress={handleForgotCustomerId}
              >
                <Text style={styles.forgotText}>Forgot Customer ID?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forgotLink}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#4b71b4',
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    marginBottom: 15,
  },
  forgotLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  forgotLink: {
    padding: 5,
  },
  forgotText: {
    color: colors.white,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#a40078',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 