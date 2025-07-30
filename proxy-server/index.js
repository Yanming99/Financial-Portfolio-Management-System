const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.post("/api/proxy/assets", async (req, res) => {
  const asset = req.body;


  console.log(`[Proxy] Received asset:`, asset);

  try {
    const response = await fetch("http://localhost:8080/api/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(asset),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to forward request." });
  }
});

app.listen(PORT, () => {
  console.log(` Proxy Server running at http://localhost:${PORT}`);
});
