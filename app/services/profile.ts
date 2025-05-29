import axios from "axios";

const BASE_URL = "http://10.192.84.3:8090/smartbranch/api/lib";

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

// Mock data for customer profile
const MOCK_CUSTOMER: Customer = {
  customer: 12345,
  customerid: "115732",
  firstnameen: "John",
  middnameen: "William",
  lastnameen: "Doe",
  nationalid: "1234567890",
  birthdate: "1991-04-21"
};

export async function fetchCustomerProfile(customerId: string): Promise<Customer | null> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return MOCK_CUSTOMER;
  } catch (error) {
    console.error('Error in fetchCustomerProfile:', error);
    throw error;
  }
} 