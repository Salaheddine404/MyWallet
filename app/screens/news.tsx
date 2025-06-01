import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function NewsScreen() {
  const router = useRouter();

  const newsItems = [
    {
      id: 1,
      title: 'Bank Al-Maghrib Maintains Key Rate at 3%',
      category: 'Monetary Policy',
      date: '2 hours ago',
      image: require('../../assets/images/bankalamaghrib.webp'),
      summary: 'The central bank keeps its benchmark interest rate unchanged, citing stable inflation expectations.'
    },
    {
      id: 2,
      title: 'Moroccan Dirham Strengthens Against Major Currencies',
      category: 'Currency Markets',
      date: '4 hours ago',
      image: require('../../assets/images/currencyMarket.webp'),
      summary: 'MAD shows resilience in global markets, gaining against USD and EUR.'
    },
    {
      id: 3,
      title: 'New Banking Regulations Announced',
      category: 'Regulatory Updates',
      date: '6 hours ago',
      image: require('../../assets/images/gouvernomentbuilding.webp'),
      summary: 'Financial authorities introduce new measures to enhance banking security.'
    },
    {
      id: 4,
      title: 'Digital Banking Services Expand',
      category: 'Banking Innovation',
      date: '8 hours ago',
      image: require('../../assets/images/bankinginnovation.webp'),
      summary: 'New mobile banking features launched to improve customer experience.'
    }
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/drawer.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Financial News</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {/* Featured News */}
          <View style={styles.featuredContainer}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity style={styles.featuredCard}>
              <View style={styles.featuredImageContainer}>
                <Image 
                  source={newsItems[0].image} 
                  style={styles.featuredImage}
                />
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{newsItems[0].category}</Text>
                </View>
              </View>
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{newsItems[0].title}</Text>
                <Text style={styles.featuredSummary}>{newsItems[0].summary}</Text>
                <View style={styles.featuredFooter}>
                  <Ionicons name="time-outline" size={16} color={colors.gray[500]} />
                  <Text style={styles.featuredDate}>{newsItems[0].date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Latest News */}
          <View style={styles.latestContainer}>
            <Text style={styles.sectionTitle}>Latest Updates</Text>
            {newsItems.slice(1).map((item) => (
              <TouchableOpacity key={item.id} style={styles.newsCard}>
                <View style={styles.newsImageContainer}>
                  <Image source={item.image} style={styles.newsImage} />
                  <View style={styles.categoryBadgeSmall}>
                    <Text style={styles.categoryBadgeTextSmall}>{item.category}</Text>
                  </View>
                </View>
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsSummary}>{item.summary}</Text>
                  <View style={styles.newsFooter}>
                    <Ionicons name="time-outline" size={14} color={colors.gray[500]} />
                    <Text style={styles.newsDate}>{item.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  featuredContainer: {
    marginBottom: 30,
  },
  featuredCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredImageContainer: {
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: 220,
    opacity: 0.9,
  },
  categoryBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  featuredContent: {
    padding: 20,
  },
  featuredTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 28,
  },
  featuredSummary: {
    color: colors.gray[400],
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredDate: {
    color: colors.gray[500],
    fontSize: 14,
  },
  latestContainer: {
    gap: 20,
  },
  newsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  newsImageContainer: {
    position: 'relative',
  },
  newsImage: {
    width: '100%',
    height: 160,
    opacity: 0.9,
  },
  categoryBadgeSmall: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryBadgeTextSmall: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsSummary: {
    color: colors.gray[400],
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  newsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  newsDate: {
    color: colors.gray[500],
    fontSize: 12,
  },
}); 