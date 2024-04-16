"use client";

import React, { FormEvent, FormEventHandler } from "react";
import crypto from "crypto";
import { useState } from "react";
import Footer from "../components/Footer";

interface ApiResponse {
  statusCode: number;
  message: string;
}

const page = () => {
  const [username, setUsername] = useState<string>("");
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");
  const [vendingAmount, setVendingAmount] = useState<number>(); // Default vending amount
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vendingToken, setVendingToken] = useState("");

  // API key for authentication
  const apiKey: string = "V9yKoxl5EljDbawloXWHaD2zgclp28U9f5YSY3U3";
  const agentWallet: string = "0x0bd3e40f8410ea473850db5479348f074d254ded";
  const agentPin: string = "1234";

  const generateVendingHash = (): string => {
    return crypto.randomBytes(8).toString("hex");
  };

  const fetchVendingToken = async () => {
    const vendingHash = generateVendingHash();
    console.log(vendingHash);
    
    try {
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
            vending_hash: vendingHash,
          }),
          // mode: "no-cors",
        }
      );
      const data = await response.json();
      setVendingToken(data.vending_token);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserWallet = async () => {
    try {
      const response = await fetch("https://api.espees.org/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ username: username }),
        // mode: "no-cors",
      });
      const data = await response.json();
      setUserWalletAddress(data.wallet_id);
    } catch (err) {
      console.log(err);
    }
  };
  // Handler function to initiate vending
  const handleVendEspees = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // First, fetch the vending token
      await fetchVendingToken();
      // Next, fetch the user wallet address
      await fetchUserWallet();
      // Now proceed to vend Espees
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
          // mode: "no-cors",
        }
      );

      const vendEspeesData = await vendEspeesResponse.json();
      setApiResponse(vendEspeesData);
    } catch (error) {
      console.error("Error vending Espees:", error);
      // Handle error
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <main className=" overflow-x-hidden h-screen">
      <div className=" bg-purple-200 w-screen h-full flex justify-center items-center">
        <form onSubmit={handleVendEspees}>
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
                onChange={(e) => setVendingAmount(e.target.valueAsNumber)}
                className="focus:outline-none focus:ring-transparent border-2 p-2 rounded-md"
              />
            </div>

            {/* Button to trigger vending */}
            <button
              className="border-2 border-white px-8 py-2 rounded-lg text-[16px] font-medium bg-indigo-800 text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Buy"}
            </button>

            {/* Display API response */}
            {apiResponse && (
              <div>
                <p>Status Code: {apiResponse.statusCode}</p>
                <p>Message: {apiResponse.message}</p>
              </div>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default page;
