import React, { useEffect, useState } from "react";
import { fetchProtectionStatus } from "../utils/api";

export default function ProtectionStatus({ scannedUrl }) {
  const [status, setStatus] = useState({
    safe: true,
    score: 100,
    message: "Waiting for URL...",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!scannedUrl) return;

    setLoading(true);
    setStatus({
      safe: true,
      score: 100,
      message: "🔄 Live Monitoring... Checking URL status...",
    });

    const timer = setTimeout(async () => {
      try {
        // Local check for insecure HTTP URLs
        if (scannedUrl.startsWith("http://")) {
          setStatus({
            safe: false,
            score: 40,
            message: "⚠️ Not listed by GSB, but page uses HTTP (insecure)",
          });
          setLoading(false);
          return;
        }

        const data = await fetchProtectionStatus(scannedUrl);
        setStatus(data);
      } catch (error) {
        console.error("Live ProtectionStatus fetch failed:", error);
        setStatus({
          safe: false,
          score: 0,
          message: "Server offline or error",
        });
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [scannedUrl]);

  // Determine background color dynamically
  const bgColor = loading
    ? "#2c3e50" // yellowish-gray while checking
    : status.safe
    ? "#073b1b" // dark green when safe
    : "#3b0a0a"; // dark red when unsafe

  const textColor = status.safe ? "#00ff9d" : "#ff6b6b";

  return (
    <div
      className="card"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.5s ease",
        border: `1px solid ${textColor}`,
      }}
    >
      <div className="card-title" style={{ color: textColor }}>
        Protection Status
      </div>

      <p style={{ color: textColor, fontWeight: "bold", fontSize: "18px" }}>
        {status.safe ? "✅ Safe" : "⚠️ Unsafe"}
      </p>

      <p
        style={{
          color: loading ? "#f1c40f" : "#ddd",
          fontSize: "14px",
          marginTop: "-5px",
        }}
      >
        {loading ? "🔄 Live Monitoring..." : status.message}
      </p>

      <p style={{ fontSize: "14px", color: "#ccc" }}>
        Score: {status.score}/100
      </p>
    </div>
  );
}


