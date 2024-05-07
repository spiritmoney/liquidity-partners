import { NextApiRequest, NextApiResponse } from "next";

const apiKey = "V9yKoxl5EljDbawloXWHaD2zgclp28U9f5YSY3U3";

const fetchUserWallet = async (username: string) => {
  const body = { username: username };

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

const userWalletAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetchUserWallet(req.body.username);
    res.status(200).json({ success: data });
  } catch (error) {
    res.status(500).json({ error: "failed to load data" });
  }
};

export default userWalletAddress;
