import axios from "axios";

const BASE_URL = "http://192.168.1.29:8090/smartbranch/api/lib";
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
  // This is a mock implementation. Replace with your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { card: "1234-5678-9012-3456" },
        { card: "9876-5432-1098-7654" },
        // Add more mock cards as needed
      ]);
    }, 1000);
  });
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
