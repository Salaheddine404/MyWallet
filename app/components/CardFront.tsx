import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChipIcon } from './ChipIcon';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

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

  return (
    <View style={[
      styles.container,
      { backgroundColor: isActive ? colors.primary : colors.gray[400] }
    ]}>
      {/* Shine effect */}
      <View style={styles.shineEffect} />
      
      {/* Bank logo and wifi icon */}
      <View style={styles.header}>
        <Text style={styles.bankName}>BOLT BANK</Text>
        <Ionicons name="wifi" size={24} color={colors.white} style={styles.wifiIcon} />
      </View>
      
      {/* Chip and card type */}
      <View style={styles.chipContainer}>
        <ChipIcon size={40} />
        <Text style={styles.cardType}>Platinum</Text>
      </View>
      
      {/* Card number */}
      <Text style={styles.cardNumber}>
        {formatCardNumber(cardNumber)}
      </Text>
      
      {/* Card holder and expiry */}
      <View style={styles.footer}>
        <View style={styles.cardHolder}>
          <Text style={styles.label}>Card Holder</Text>
          <Text style={styles.value}>{cardHolder || 'YOUR NAME'}</Text>
        </View>
        <View style={styles.expiry}>
          <Text style={styles.label}>Expires</Text>
          <Text style={styles.value}>{expiryDate || 'MM/YY'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
  },
  bankName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
  },
  wifiIcon: {
    opacity: 0.8,
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  cardType: {
    marginLeft: 'auto',
    color: colors.white,
    opacity: 0.8,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardNumber: {
    fontSize: 20,
    color: colors.white,
    letterSpacing: 2,
    marginBottom: 30,
    fontFamily: 'monospace',
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
    fontSize: 10,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
}); 