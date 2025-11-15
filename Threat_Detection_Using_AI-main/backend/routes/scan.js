// backend/routes/scan.js

import express from "express";
import { checkGoogleSafeBrowsing } from "../utils/googleSafe.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ safe: false, reason: "Server missing Google API key" });
    }

    // Optional quick heuristic: insecure protocol
    const isHttp = /^http:\/\//i.test(url);

    // Query GSB
    const gsb = await checkGoogleSafeBrowsing(url, apiKey);

    let safe = gsb.safe;
    let reason = gsb.reason;

    // treat plain HTTP as a warning if not flagged by GSB
    if (isHttp && safe) {
      safe = false;
      reason = "Not listed by GSB, but page uses HTTP (insecure)";
    }

    // score logic: high if safe; low if flagged; medium if HTTP
    let score = safe ? 95 : 20;
    if (!safe && /http/i.test(reason)) score = 60;

    res.json({
      safe,
      reason,
      score,
      gsb_raw: gsb.raw || null
    });
  } catch (err) {
    console.error("scan error:", err);
    res.status(500).json({ safe: false, reason: "scan failed", error: String(err) });
  }
});

export default router;

