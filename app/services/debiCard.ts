import axios from 'axios';

interface DebitCardRequest {
  header: {
    idmsg: string;
    mac: string;
  };
  initiator: {
    operation: string;
    customerid: string;
    accountnumber: string;
    cardprogramcode: string;
    nameoncard: string;
    firstname: string;
    middlename: string;
    lastname: string;
    customertype: string;
    accounttype: string;
    currencycode: string;
    phonenumber: string;
    branchcode: string;
    nationalid: string;
    nationalidtype: string;
    birthdate: string;
    institution: string;
    bankaccounttype: string;
    profetionalposition: string;
    gender: string;
    debitprogram: string;
    addresstype: string;
    zipaddress: string;
    fax: string;
    language: string;
    corporatename: string;
    destination: string;
  };
}

interface DebitCardResponse {
  header: {
    idmsg: string;
    mac: string;
  };
  status: {
    codeerror: string;
    codestatus: string;
    descstatus: string;
    msgerror: string;
  };
}

export async function requestDebitCard(data: Omit<DebitCardRequest, 'header'>): Promise<DebitCardResponse> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return mock success response
    return {
      header: {
        idmsg: "000000000104",
        mac: "bcecfa664e12edca"
      },
      status: {
        codeerror: "000",
        codestatus: "2",
        descstatus: "Success",
        msgerror: ""
      }
    };
  } catch (error) {
    console.error('Error requesting debit card:', error);
    throw error;
  }
} 