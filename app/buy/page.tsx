"use client";

import React from "react";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
const vendingToken = require("@/index");

interface ApiResponse {
  statusCode: number;
  message: string;
}

const page = () => {
  const [username, setUsername] = useState<string>("");
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");
  const [vendingAmount, setVendingAmount] = useState<number>(); // Default vending amount
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  // API key for authentication
  const apiKey: string = "V9yKoxl5EljDbawloXWHaD2zgclp28U9f5YSY3U3";

  // Handler function to fetch user's wallet address and initiate vending
  const handleVendEspees = async () => {
    try {
      //Step 1: Get user wallet address
      const userAddressResponse = await fetch(
        "https://api.espees.org/user/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({ username }),
          mode: "no-cors",
        }
      );

      if (!userAddressResponse.ok) {
        console.error(
          "Error fetching Agent address:",
          userAddressResponse.status
        );
        return;
      }

      const userAddressData = await userAddressResponse.json();
      console.log(userAddressData);

      setUserWalletAddress(userAddressData.wallet_address);
      console.log(userWalletAddress);

      // Step 2: Start to Vend Espees
      const vendEspeesResponse = await fetch(
        "https://api.espees.org/v2/vending/vend",
        {
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
          mode: "no-cors",
        }
      );

      const vendEspeesData = await vendEspeesResponse.json();
      setApiResponse(vendEspeesData);
    } catch (error) {
      console.error("Error vending Espees:", error);
      // Handle error
    }
  };

  return (
    <main className=" overflow-x-hidden h-screen">
      <div className=" bg-purple-200 w-screen h-full flex justify-center items-center">
        <div className="flex-col border p-10 rounded-lg bg-white">
          {/* Input for username */}
          <div className="py-5">
            <p>Espees Account to fund</p>
            <input
              type="text"
              placeholder="Espees wallet Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus:outline-none focus:ring-transparent border-2 p-2 rounded-md"
            />
          </div>

          {/* Input for amount to vend */}
          <div className="py-5">
            <p>Amount you want to Buy (Espees)</p>
            <input
              type="number"
              placeholder="Enter amount in Espees"
              value={vendingAmount}
              onChange={(e) => setVendingAmount(parseFloat(e.target.value))}
              className="focus:outline-none focus:ring-transparent border-2 p-2 rounded-md"
            />
          </div>

          {/* Button to trigger vending */}
          <button
            className="border-2 border-white px-8 py-2 rounded-lg text-[16px] font-medium bg-indigo-800 text-white"
            onClick={handleVendEspees}
          >
            Buy
          </button>

          {/* Display API response */}
          {apiResponse && (
            <div>
              <p>Status Code: {apiResponse.statusCode}</p>
              <p>Message: {apiResponse.message}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default page;
