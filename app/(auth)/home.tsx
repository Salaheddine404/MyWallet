import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { fetchCardList } from "../services/cardlist";
import { changeCardStatus } from "../services/status";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { CardFront } from "../components/CardFront";
import { CardBack } from "../components/CardBack";

interface Card {
  card: string;
  pan: string;
  name_on_card: string;
  status: string;
  expiry_date: string;
  card_type: string;
}

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const flipAnimations = useRef<{ [key: string]: Animated.Value }>({});
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    // Open drawer when screen becomes active
    const unsubscribe = navigation.addListener('focus', () => {
      if (!isDrawerOpen) {
        setIsDrawerOpen(true);
        toggleDrawer();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, isDrawerOpen]);

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? 0 : 1;
    Animated.spring(drawerAnimation, {
      toValue,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerNavigation = (path: string) => {
    toggleDrawer();
    // Add a small delay to allow the drawer to close smoothly
    setTimeout(() => {
      router.push({ pathname: path });
    }, 300);
  };

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  const mainTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DRAWER_WIDTH / 2],
  });

  const mainScale = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const mainOpacity = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  const loadCards = async () => {
    try {
      const data = await fetchCardList(customerId);
      setCards(data);
      // Initialize animations for each card
      data.forEach(card => {
        flipAnimations.current[card.card] = new Animated.Value(0);
      });
    } catch (error) {
      console.error("Error loading cards:", error);
      setError("Failed to load cards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCard = (cardId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));

    Animated.spring(flipAnimations.current[cardId], {
      toValue: flippedCards[cardId] ? 0 : 1,
      friction: 12,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleStatusChange = async (card: Card) => {
    try {
      const newStatus = card.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      const success = await changeCardStatus(card.pan, card.expiry_date, newStatus);
      
      if (success) {
        setCards(prevCards => 
          prevCards.map(c => 
            c.card === card.card ? { ...c, status: newStatus } : c
          )
        );
      }
    } catch (error) {
      console.error("Error changing card status:", error);
      Alert.alert("Error", "Failed to change card status. Please try again.");
    }
  };

  const renderDrawer = () => (
    <Animated.View
      style={[
        styles.drawer,
        {
          transform: [{ translateX: drawerTranslateX }],
        },
      ]}
    >
      <View style={styles.drawerHeader}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={toggleDrawer}
        >
          <Ionicons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.drawerAvatar}>
          <Ionicons name="person" size={40} color={colors.white} />
        </View>
        <Text style={styles.drawerName}>SAAID TALIBI</Text>
      </View>
      
      <View style={styles.drawerContent}>
        {/* My News Section */}
        <View style={styles.drawerSection}>
          <Text style={styles.sectionTitle}>My News</Text>
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => handleDrawerNavigation('/screens/news')}
          >
            <Ionicons name="newspaper-outline" size={24} color={colors.white} />
            <Text style={styles.drawerItemText}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => handleDrawerNavigation('/screens/devices')}
          >
            <Ionicons name="phone-portrait-outline" size={24} color={colors.white} />
            <Text style={styles.drawerItemText}>Devises</Text>
          </TouchableOpacity>
        </View>

        {/* My Operations Section */}
        <View style={styles.drawerSection}>
          <Text style={styles.sectionTitle}>My Operations</Text>
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => handleDrawerNavigation('/screens/make-transaction')}
          >
            <Ionicons name="swap-horizontal-outline" size={24} color={colors.white} />
            <Text style={styles.drawerItemText}>Make Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => handleDrawerNavigation('/screens/receivers')}
          >
            <Ionicons name="people-outline" size={24} color={colors.white} />
            <Text style={styles.drawerItemText}>Bénéficiaires</Text>
          </TouchableOpacity>
        </View>

        {/* Online Service Section */}
        <View style={styles.drawerSection}>
          <Text style={styles.sectionTitle}>Online Service</Text>
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => handleDrawerNavigation('/screens/my-benefits')}
          >
            <Ionicons name="gift-outline" size={24} color={colors.white} />
            <Text style={styles.drawerItemText}>My Benefits</Text>
          </TouchableOpacity>
        </View>

        {/* Assistance Section */}
        <View style={styles.drawerSection}>
          <Text style={styles.sectionTitle}>Assistance</Text>
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => handleDrawerNavigation('/screens/client-relation')}
          >
            <Ionicons name="headset-outline" size={24} color={colors.white} />
            <Text style={styles.drawerItemText}>Client Relation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  if (isLoading) {
    return (
      <ImageBackground
        source={require('../../assets/images/homescreenback.webp')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading cards...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {renderDrawer()}
      <Animated.View
        style={[
          styles.mainContent,
          {
            transform: [
              { translateX: mainTranslateX },
              { scale: mainScale },
            ],
            opacity: mainOpacity,
          },
        ]}
      >
        <ImageBackground
          source={require('../../assets/images/homescreenback.webp')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
              <Ionicons name="menu" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Wallet</Text>
          </View>
          
          <ScrollView style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>My Cards</Text>
              
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : (
                <View style={styles.cardsContainer}>
                  {cards.map((card) => (
                    <View key={card.card} style={styles.cardWrapper}>
                      <View style={styles.cardContainer}>
                        <TouchableOpacity
                          onPress={() => toggleCard(card.card)}
                          activeOpacity={0.9}
                        >
                          <Animated.View
                            style={[
                              styles.card,
                              {
                                transform: [
                                  {
                                    rotateY: flipAnimations.current[card.card]?.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: ['0deg', '180deg']
                                    })
                                  },
                                  {
                                    perspective: 1000
                                  }
                                ]
                              }
                            ]}
                          >
                            <Animated.View
                              style={[
                                styles.cardFace,
                                {
                                  backfaceVisibility: 'hidden',
                                  transform: [
                                    {
                                      rotateY: flipAnimations.current[card.card]?.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '180deg']
                                      })
                                    }
                                  ]
                                }
                              ]}
                            >
                              <CardFront 
                                cardNumber={card.pan}
                                cardHolder={card.name_on_card}
                                expiryDate={card.expiry_date}
                                isActive={card.status === 'ACTIVE'}
                              />
                            </Animated.View>
                            <Animated.View
                              style={[
                                styles.cardFace,
                                styles.cardBack,
                                {
                                  backfaceVisibility: 'hidden',
                                  transform: [
                                    {
                                      rotateY: flipAnimations.current[card.card]?.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['180deg', '360deg']
                                      })
                                    }
                                  ]
                                }
                              ]}
                            >
                              <CardBack 
                                cvv="XXX"
                                isActive={card.status === 'ACTIVE'}
                              />
                            </Animated.View>
                          </Animated.View>
                        </TouchableOpacity>
                      </View>
                      
                      <View style={styles.cardControls}>
                        <TouchableOpacity
                          style={[styles.controlButton, card.status === 'ACTIVE' ? styles.activeButton : styles.inactiveButton]}
                          onPress={() => handleStatusChange(card)}
                        >
                          <Ionicons 
                            name={card.status === 'ACTIVE' ? 'power' : 'power-outline'} 
                            size={20} 
                            color={colors.white} 
                          />
                          <Text style={styles.controlButtonText}>
                            {card.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: 'rgba(45, 27, 77, 0.95)',
    padding: 20,
    zIndex: 1000,
  },
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  drawerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  drawerName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerContent: {
    marginTop: 20,
  },
  drawerSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.7,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  drawerItemText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuButton: {
    padding: 10,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loadingText: {
    marginTop: 10,
    color: colors.white,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  errorText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardsContainer: {
    padding: 15,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    width: '100%',
    aspectRatio: 1.6,
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
  },
  cardControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#00A36C',
  },
  inactiveButton: {
    backgroundColor: colors.gray[400],
  },
  controlButtonText: {
    color: colors.white,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    zIndex: 1,
  },
});
