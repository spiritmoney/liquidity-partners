// import fetch from "node-fetch";
import * as crypto from "crypto";

const apiKey = "V9yKoxl5EljDbawloXWHaD2zgclp28U9f5YSY3U3";
const agentWallet = "0x0bd3e40f8410ea473850db5479348f074d254ded";
const agentPin = "1234";
const hash: string = crypto.randomBytes(8).toString("hex");
console.log(hash);


export const fetchVendingToken = async () => {
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
      body: JSON.stringify({
        vending_wallet_address: agentWallet,
        vending_wallet_pin: agentPin,
        vending_hash: hash,
      }),
    }
  );

  // if (!response.ok) {
  //   throw new Error("Failed to fetch Vending Token");
  // }

  const responseData = await response.json();
  console.log("fetchVendingToken response", responseData);
  return responseData;
};

export const fetchUserWallet = async (username: string) => {
  const body = { username };

  console.log("fetchUserWallet request", body);

  const response = await fetch("https://api.espees.org/user/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch wallet for user ${username}`);
  }

  const responseData = await response.json();
  console.log("fetchUserWallet response", responseData);
  return responseData;
};

export const vendEspees = async (username: string, vendingAmount: number) => {
  const vendingTokenResponse = await fetchVendingToken();
  const vendingToken = vendingTokenResponse.vending_token;

  const userWalletResponse = await fetchUserWallet(username);
  const userWalletAddress = userWalletResponse.wallet_address;

  const response = await fetch("https://api.espees.org/v2/vending/vend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      vending_token: vendingToken,
      user_wallet: userWalletAddress,
      amount_in_espees: vendingAmount,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to vend Espees");
  }

  return response.json();
};
