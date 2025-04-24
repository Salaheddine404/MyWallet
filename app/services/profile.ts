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

export async function fetchCustomerProfile(customerId: string): Promise<Customer | null> {
  try {
    console.log('Starting fetchCustomerProfile for ID:', customerId);
    
    const requestBody = {
      header: {
        idmsg: "000000000104",
        mac: "bcecfa664e12edca"
      },
      filter: {
        customer: customerId,
        nationalid: "",
        institution: "7601",
        start: "0",
        end: "100"
      }
    };

    console.log('Sending request with body:', JSON.stringify(requestBody, null, 2));
    
    const response = await axios.post<CustomerResponse>(`${BASE_URL}/customerlist`, requestBody);

    console.log('Raw API response:', JSON.stringify(response.data, null, 2));

    if (!response.data) {
      console.error('No response data received');
      return null;
    }

    if (!response.data.body) {
      console.error('No body in response:', response.data);
      return null;
    }

    if (!response.data.body.customers || response.data.body.customers.length === 0) {
      console.error('No customers in response:', response.data.body);
      return null;
    }

    const customerData = response.data.body.customers[0];
    console.log('Received customer data:', customerData);

    // Verify the customer ID matches
    if (customerData.customerid !== customerId) {
      console.error('Customer ID mismatch:', {
        requested: customerId,
        received: customerData.customerid
      });
      return null;
    }

    return customerData;
  } catch (error) {
    console.error('Error in fetchCustomerProfile:', error);
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