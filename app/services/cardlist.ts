import axios from "axios";

const BASE_URL = "http://10.192.84.3:8090/smartbranch/api/lib";
const HEADER = {
  header: {
    idmsg: "000000000104",
    mac: "bcecfa664e12edca",
  },
};

interface Card {
  card: string;
  pan: string;
  name_on_card: string;
  status: string;
  expiry_date: string;
  card_type: string;
}

// Mock data for cards
const MOCK_CARDS: Card[] = [
  {
    card: "CARD001",
    pan: "4532********7890",
    name_on_card: "HAMID EL-QASRY",
    status: "ACTIVE",
    expiry_date: "12/25",
    card_type: "VISA"
  },
  {
    card: "CARD002",
    pan: "5248********4567",
    name_on_card: "HAMID EL-QASRY",
    status: "ACTIVE",
    expiry_date: "09/24",
    card_type: "MASTERCARD"
  },
  {
    card: "CARD003",
    pan: "6011********8901",
    name_on_card: "HAMID EL-QASRY",
    status: "INACTIVE",
    expiry_date: "03/26",
    card_type: "VISA"
  }
];

export async function fetchCardList(customerId: string): Promise<Card[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return MOCK_CARDS;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
} 