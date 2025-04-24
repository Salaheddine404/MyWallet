import axios from "axios";

const BASE_URL = "http://10.192.84.3:8090/smartbranch/api/lib";
const HEADER = {
  header: {
    idmsg: "000000000104",
    mac: "bcecfa664e12edca",
  },
};

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

interface ChangeStatusResponse {
  header: {
    idmsg: string;
    mac: string;
  };
  body: {
    status: {
      errorcode: string;
      errordesc: string;
    };
  };
}

export async function changeCardStatus(cardNumber: string, expiry: string, newStatus: string): Promise<boolean> {
  try {
    // Ensure we're using the complete PAN
    const completePAN = cardNumber.replace(/\s/g, ''); // Remove any spaces from the PAN
    console.log('Using complete PAN for status change:', completePAN);

    // Map the status codes: 2 for activated, 3 for blocked
    const statusCode = newStatus === "2" ? "2" : "3";

    const requestBody: ChangeStatusRequest = {
      header: {
        idmsg: "000000000104",
        mac: "bcecfa664e12edca"
      },
      initiator: {
        status: statusCode,
        expiry: expiry,
        card: completePAN,
        institution: "7601"
      }
    };

    console.log('Sending status change request:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post<ChangeStatusResponse>(`${BASE_URL}/changestatus`, requestBody);
    
    console.log('Full response:', JSON.stringify(response.data, null, 2));

    // Check if the response has the correct structure
    if (!response.data || !response.data.body || !response.data.body.status) {
      console.error('Invalid response structure:', response.data);
      throw new Error('Invalid response structure from server');
    }

    // Log the complete status object
    console.log('Status object:', response.data.body.status);

    // Check for success (errorcode "000" means success)
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