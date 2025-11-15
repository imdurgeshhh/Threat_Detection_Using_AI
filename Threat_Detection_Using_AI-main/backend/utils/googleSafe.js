// backend/utils/googleSafe.js
import fetch from "node-fetch"; // if Node>=18, you can remove this import and use global fetch
const GSB_ENDPOINT = "https://safebrowsing.googleapis.com/v4/threatMatches:find";

export async function checkGoogleSafeBrowsing(urlToCheck, apiKey) {
  if (!urlToCheck) throw new Error("url required");
  const body = {
    client: {
      clientId: "secureindia",
      clientVersion: "1.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: urlToCheck }]
    }
  };

  const res = await fetch(`${GSB_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    timeout: 15000
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GSB HTTP ${res.status}: ${txt}`);
  }

  const data = await res.json();
  // If matches array is present and non-empty => threat detected
  const matches = data && data.matches ? data.matches : [];
  if (matches.length > 0) {
    return {
      safe: false,
      reason: "Google Safe Browsing flagged this URL",
      raw: data
    };
  }
  return {
    safe: true,
    reason: "Not found in Google Safe Browsing",
    raw: data
  };
}
