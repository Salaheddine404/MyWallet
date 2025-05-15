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
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function HomeScreen() {
  const router = useRouter();
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const flipAnimations = useRef<{ [key: string]: Animated.Value }>({});

  useEffect(() => {
    loadCards();
  }, []);

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
      Alert.alert("Error", "Failed to load cards. Please try again.");
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

  if (isLoading) {
    return (
      <ImageBackground
        source={require('../../assets/images/background.webp')}
        style={styles.backgroundImage}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/background.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Cards</Text>
          </View>

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
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.9,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
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
    backgroundColor: colors.primary,
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
});
