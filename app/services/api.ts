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

interface ChangeStatusRequest {
  header: {
    idmsg: string;
    mac: string;
  };
  initiator: {
    status: string;
    expiry: string;
    card: string;
    institution: string;
  };
}

export async function fetchCardList(customerId: string): Promise<Card[]> {
  try {
    console.log('Fetching cards for customer:', customerId);
    
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

export async function fetchCustomerProfile(customerId: string): Promise<Customer | null> {
  try {
    console.log('Fetching customer profile for ID:', customerId);
    
    const response = await axios.post(`${BASE_URL}/customerlist`, {
      ...HEADER,
      filter: {
        customer: customerId,
        institution: "7601",
        start: "1",
        end: "1"
      },
    });

    console.log('Customer profile response:', response.data);

    if (!response.data || !response.data.body || !response.data.body.customers || response.data.body.customers.length === 0) {
      console.error('No customer data found in response');
      return null;
    }

    const customerData = response.data.body.customers[0];
    return {
      customer: customerData.customer,
      customerid: customerData.customerid,
      firstnameen: customerData.firstnameen,
      middnameen: customerData.middnameen,
      lastnameen: customerData.lastnameen,
      nationalid: customerData.nationalid,
      birthdate: customerData.birthdate
    };
  } catch (error) {
    console.error('Error fetching customer profile:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
}

export async function changeCardStatus(cardNumber: string, expiry: string, newStatus: string): Promise<boolean> {
  try {
    const requestBody = {
      header: {
        idmsg: "000000000104",
        mac: "bcecfa664e12edca"
      },
      initiator: {
        status: newStatus,
        expiry: expiry,
        card: cardNumber,
        institution: "7601"
      }
    };

    console.log('Sending status change request:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(`${BASE_URL}/changestatus`, requestBody);
    
    console.log('Full response:', JSON.stringify(response.data, null, 2));

    // Check if the response has the correct structure
    if (!response.data || !response.data.body || !response.data.body.status) {
      console.error('Invalid response structure:', response.data);
      throw new Error('Invalid response structure from server');
    }

    // Log the complete status object
    console.log('Status object:', response.data.body.status);

    // Check for success
    const success = response.data.body.status.errorcode === "000";
    if (!success) {
      console.error('Status change failed with error:', {
        errorcode: response.data.body.status.errorcode,
        errordesc: response.data.body.status.errordesc
      });
    }
    return success;
  } catch (error) {
    console.error('Error changing card status:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
}
