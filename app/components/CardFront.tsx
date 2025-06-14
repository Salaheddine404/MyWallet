import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { ChipIcon } from './ChipIcon';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

interface CardFrontProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isActive?: boolean;
}

export const CardFront: React.FC<CardFrontProps> = ({
  cardNumber,
  cardHolder,
  expiryDate,
  isActive = true,
}) => {
  const formatCardNumber = (number: string) => {
    const visiblePart = number.slice(-4);
    return `•••• •••• •••• ${visiblePart}`;
  };

  const textColor = isActive ? colors.white : colors.black;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={isActive ? require('../../assets/images/activecard.jpg') : require('../../assets/images/inactive.jpg')}
        style={styles.card}
        resizeMode="stretch"
      >
        <View style={styles.contentContainer}>
          {/* Shine effect */}
          <View style={styles.shineEffect} />
          
          {/* Bank logo and wifi icon */}
          <View style={styles.header}>
            <Text style={[styles.bankName, { color: textColor }]}>Libyan IslamicBank</Text>
            <Ionicons name="wifi" size={24} color={textColor} style={styles.wifiIcon} />
          </View>
          
          {/* Chip and card type */}
          <View style={styles.chipContainer}>
            <ChipIcon size={40} />
            <Text style={[styles.cardType, { color: textColor }]}>Platinum</Text>
          </View>
          
          {/* Card number */}
          <Text style={[styles.cardNumber, { color: textColor }]}>
            {formatCardNumber(cardNumber)}
          </Text>
          
          {/* Card holder and expiry */}
          <View style={styles.footer}>
            <View style={styles.cardHolder}>
              <Text style={[styles.label, { color: textColor }]}>Card Holder</Text>
              <Text style={[styles.value, { color: textColor }]}>{cardHolder || 'YOUR NAME'}</Text>
            </View>
            <View style={styles.expiry}>
              <Text style={[styles.label, { color: textColor }]}>Expires</Text>
              <Text style={[styles.value, { color: textColor }]}>{expiryDate || 'MM/YY'}</Text>
            </View>
          </View>

          {/* Decorative circles */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  card: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    opacity: 0.1,
    transform: [{ rotate: '45deg' }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  bankName: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  wifiIcon: {
    opacity: 0.9,
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  cardType: {
    marginLeft: 'auto',
    opacity: 0.9,
    fontSize: 14,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardNumber: {
    fontSize: 24,
    letterSpacing: 3,
    marginBottom: 32,
    fontFamily: 'monospace',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  cardHolder: {
    flex: 1,
  },
  expiry: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 6,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -100,
    right: -100,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    bottom: -75,
    left: -75,
  },
}); 