import express from 'express'
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

app.post("/api/vending/vend", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.espees.org/v2/vending/vend",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Proxy server running on port ${port}`));
