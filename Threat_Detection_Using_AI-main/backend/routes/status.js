import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/", async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const testUrl = req.query.url || "https://www.youtube.com/";

  if (!apiKey) {
    console.error("❌ GOOGLE_API_KEY missing in .env");
    return res.json({ safe: false, score: 0, message: "Server missing Google API key" });
  }

  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const body = {
    client: { clientId: "secureindia", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: testUrl }],
    },
  };

  try {
    console.log("🔹 Checking URL:", testUrl);
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log("🔹 Google Safe Browsing response:", data);

    const unsafe = data?.matches && data.matches.length > 0;
    res.json({
      safe: !unsafe,
      score: unsafe ? 20 : 95,
      message: unsafe
        ? "⚠️ Unsafe! Found in Google Safe Browsing"
        : "✅ Not found in Google Safe Browsing database",
    });
  } catch (err) {
    console.error("🔥 Google Safe Browsing check failed:", err);
    res.status(500).json({ safe: false, score: 0, message: "Internal error" });
  }
});

export default router;
