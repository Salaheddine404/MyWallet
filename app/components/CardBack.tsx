import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface CardBackProps {
  cvv: string;
  isActive?: boolean;
}

export const CardBack: React.FC<CardBackProps> = ({
  cvv,
  isActive = true,
}) => {
  return (
    <View style={[
      styles.container,
      { backgroundColor: isActive ? colors.primary : colors.gray[400] }
    ]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  magneticStripe: {
    width: '100%',
    height: 40,
    backgroundColor: colors.black,
    marginTop: 20,
  },
  signatureStrip: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  signatureArea: {
    flex: 1,
    height: 32,
    backgroundColor: colors.white,
    position: 'relative',
    overflow: 'hidden',
  },
  signatureText: {
    position: 'absolute',
    color: colors.gray[400],
    fontSize: 8,
    lineHeight: 10,
    opacity: 0.3,
  },
  cvvContainer: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.white,
  },
  cvvText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  footer: {
    marginTop: 'auto',
    padding: 16,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    marginLeft: 8,
    color: colors.white,
    opacity: 0.8,
    fontSize: 10,
  },
  termsText: {
    color: colors.white,
    opacity: 0.7,
    fontSize: 8,
    lineHeight: 10,
  },
}); 