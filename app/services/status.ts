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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always return success for mock data
    return true;
  } catch (error) {
    console.error('Error changing card status:', error);
    throw error;
  }
} 