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

export async function fetchCardList(customerId: string): Promise<Card[]> {
  try {
    const response = await axios.post(`${BASE_URL}/cardlist`, {
      ...HEADER,
      filter: {
        account: "",
        card: "",
        pan: "",
        customer: customerId,
        name_on_card: "",
        institution: "7601",
        start: "1",
        end: "4",
      },
    });
    console.log("API Response:", response.data); // Add this for debugging
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
    return [];
  }
}

export const fetchCustomerProfile = async (customerId: string) => {
  const response = await axios.post(`${BASE_URL}/customerlist`, {
    ...HEADER,
    filter: {
      customer: customerId,
      nationalid: "",
      institution: "7601",
      start: "0",
      end: "100",
    },
  });
  return response.data.body.customers[0];
};
