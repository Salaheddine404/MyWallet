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

interface Customer {
  customer: number;
  customerid: string;
  firstnameen: string;
  middnameen: string;
  lastnameen: string;
  nationalid: string;
  birthdate: string | null;
}

interface CustomerResponse {
  header: {
    idmsg: string;
    mac: string;
  };
  body: {
    customers: Customer[];
    status: {
      errorcode: string;
      errordesc: string;
    };
  };
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
    console.log("API Response:", response.data);
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

export async function fetchCustomerProfile(customerId: string): Promise<Customer | null> {
  try {
    const response = await axios.post<CustomerResponse>(`${BASE_URL}/customerlist`, {
      ...HEADER,
      filter: {
        customer: customerId,
        nationalid: "",
        institution: "7601",
        start: "0",
        end: "100",
      },
    });
    console.log("Customer API Response:", response.data);
    return response.data.body.customers[0] || null;
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    if (axios.isAxiosError(error)) {
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    return null;
  }
}
