import crypto from "crypto";

const generateVendingHash = (): string => {
  return crypto.randomBytes(8).toString("hex");
};

const vendingHash: string = generateVendingHash();

const agent_wallet_address = "0x0bd3e40f8410ea473850db5479348f074d254ded";
const agent_wallet_pin = "1234";

const vendingTokenResponse = await fetch(
  "https://api.espees.org/agents/vending/createtoken",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "V9yKoxl5EljDbawloXWHaD2zgclp28U9f5YSY3U3",
    },
    body: JSON.stringify({
      vending_wallet_address: agent_wallet_address,
      vending_wallet_pin: agent_wallet_pin,
      vending_hash: vendingHash,
    }),
    mode: "no-cors",
  }
);

const vendingTokenData = await vendingTokenResponse.json();
console.log(vendingTokenData);
export const VendingToken: string = vendingTokenData.vending_token;
console.log(VendingToken);

// export default VendingToken;
