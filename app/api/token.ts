import { NextApiRequest, NextApiResponse } from "next";
import crypto from 'crypto'

const apiKey = "V9yKoxl5EljDbawloXWHaD2zgclp28U9f5YSY3U3";
const agentWallet = "0x0bd3e40f8410ea473850db5479348f074d254ded";
const agentPin = "1234";
const hash: string = crypto.randomBytes(8).toString("hex");

const fetchVendingToken = async () => {
  const body = {
    vending_wallet_address: agentWallet,
    vending_wallet_pin: agentPin,
    vending_hash: hash,
  };

  console.log("fetchVendingToken request", body);

  const response = await fetch(
    "https://api.espees.org/agents/vending/createtoken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Vending Token");
  }

  const responseData = await response.json();
  console.log("fetchVendingToken response", responseData);
  return responseData;
};

const vendingToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetchVendingToken();
    res.status(200).json({ success: data });
  } catch (error) {
    res.status(500).json({ error: "failed to load data" });
  }
};

export default vendingToken;
