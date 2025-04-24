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
  // Add other card properties as needed
}

interface CardListResponse {
  header: {
    idmsg: string;
    mac: string;
  };
  body: {
    cards: Card[];
    status: {
      errorcode: string;
      errordesc: string;
    };
  };
}

export async function fetchCardList(customerId: string): Promise<Card[]> {
  try {
    console.log('Fetching cards for customer:', customerId);
    
    const response = await axios.post<CardListResponse>(`${BASE_URL}/cardlist`, {
      ...HEADER,
      filter: {
        account: "",
        card: "",
        pan: "",
        customer: customerId,
        name_on_card: "",
        institution: "7601",
        start: "1",
        end: "100",
      },
    });

    console.log("API Response:", response.data);

    if (!response.data || !response.data.body) {
      console.error("Invalid response structure:", response.data);
      throw new Error("Invalid response from server");
    }

    if (response.data.body.status && response.data.body.status.errorcode !== "000") {
      console.error("API returned error:", response.data.body.status);
      throw new Error(response.data.body.status.errordesc || "Failed to fetch cards");
    }

    if (!response.data.body.cards) {
      console.error("No cards array in response:", response.data);
      return [];
    }

    return response.data.body.cards;
  } catch (error) {
    console.error("Error fetching cards:", error);
    if (axios.isAxiosError(error)) {
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
} 