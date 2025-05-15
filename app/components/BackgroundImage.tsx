import React from 'react';
import { ImageBackground, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface BackgroundImageProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ children, style }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.webp')}
      style={[styles.background, style]}
      resizeMode="cover"
      imageStyle={styles.image}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
}); 