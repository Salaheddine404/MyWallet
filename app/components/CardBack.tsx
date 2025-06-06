import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

interface CardBackProps {
  cvv: string;
  isActive?: boolean;
}

export const CardBack: React.FC<CardBackProps> = ({
  cvv,
  isActive = true,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: isActive ? '#90EE90' : '#00A36C' }]}>
      {/* Magnetic stripe */}
      <View style={styles.magneticStripe} />
      
      {/* Signature strip */}
      <View style={styles.signatureStrip}>
        <View style={styles.signatureArea}>
          <Text style={styles.signatureText}>
            AUTHORIZED SIGNATURE
          </Text>
        </View>
        <View style={styles.cvvContainer}>
          <Text style={styles.cvvText}>{cvv || 'XXX'}</Text>
        </View>
      </View>
      
      {/* Card issuer info */}
      <View style={styles.footer}>
        <View style={styles.serviceInfo}>
          <Ionicons name="card" size={16} color={colors.white} />
          <Text style={styles.serviceText}>
            24/7 Customer Service: 1-800-BOLT-BANK
          </Text>
        </View>
        <Text style={styles.termsText}>
          This card is property of Bolt Bank and must be returned upon request.
          Use of this card is subject to the cardholder agreement.
        </Text>
      </View>

      {/* Decorative circles */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
  },
  magneticStripe: {
    width: '100%',
    height: 48,
    backgroundColor: colors.black,
    marginTop: 24,
  },
  signatureStrip: {
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  signatureArea: {
    flex: 1,
    height: 40,
    backgroundColor: colors.white,
    position: 'relative',
    overflow: 'hidden',
  },
  signatureText: {
    position: 'absolute',
    color: colors.gray[400],
    fontSize: 10,
    lineHeight: 12,
    opacity: 0.3,
    letterSpacing: 1.2,
  },
  cvvContainer: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  cvvText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'monospace',
    letterSpacing: 1.5,
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceText: {
    marginLeft: 10,
    color: colors.white,
    opacity: 0.9,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  termsText: {
    color: colors.white,
    opacity: 0.8,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.3,
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