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
    const requestData: DebitCardRequest = {
      header: {
        idmsg: "000000000104",
        mac: "bcecfa664e12edca"
      },
      initiator: data
    };

    const response = await axios.post(
      'http://10.192.84.3:8090/smartbranch/api/lib/debitapplication',
      requestData
    );

    return response.data;
  } catch (error) {
    console.error('Error requesting debit card:', error);
    throw error;
  }
} 