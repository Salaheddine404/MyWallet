import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface ChipIconProps {
  size?: number;
}

export const ChipIcon: React.FC<ChipIconProps> = ({ size = 40 }) => {
  return (
    <View style={[styles.chip, { width: size, height: size * 0.7 }]}>
      <View style={styles.chipLines}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.gold,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  chipLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  line: {
    width: 2,
    backgroundColor: colors.black,
    opacity: 0.3,
  },
}); 