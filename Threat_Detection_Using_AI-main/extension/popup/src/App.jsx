
import ProtectionStatus from "./components/ProtectionStatus";
import AdBlockProtection from "./components/AdBlockProtection";
import CloudSecurityMonitor from "./components/CloudSecurityMonitor";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { fetchWithTimeout, API_BASE } from "./utils/api";
import { saveScanHistoryEntry, loadScanHistory, clearScanHistory } from "./utils/storage";

export default function App() {
  const [url, setUrl] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [lastScannedUrl, setLastScannedUrl] = useState("");


  // Load saved history once
  useEffect(() => {
    loadScanHistory().then((data) => setHistory(data));
  }, []);

  async function handleScan() {
    if (!url.trim()) {
      alert("Please enter a URL to scan");
      return;
    }
    setLoading(true);
    setScanResult(null);
    setLastScannedUrl(url); 

    try {
      const res = await fetchWithTimeout(`${API_BASE}/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      setScanResult(res);

      const entry = { url, ...res, time: new Date().toISOString() };
      saveScanHistoryEntry(entry);
      setHistory((prev) => [entry, ...prev]);
    } catch (err) {
      console.error(err);
      setScanResult({ safe: false, reason: err.message });
    } finally {
      setLoading(false);
    }
  }

  function handleClearHistory() {
    clearScanHistory();
    setHistory([]);
  }

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <div className="shield-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
            </svg>
          </div>
          <div className="title-section">
            <h1>SecureIndia</h1>
            <p>Digital Protection Suite</p>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {/* Website Scanner */}
        <div className="card">
          <div className="card-title">Website Safety Scanner</div>
          <div className="scanner-form">
            <input
              className="url-input"
              value={url}
              onChange={(e) => {
                const newUrl = e.target.value;
                setUrl(newUrl);
                setLastScannedUrl(newUrl); 
              }}
              // onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
            <button onClick={handleScan} className="scan-btn" disabled={loading}>
              {loading ? "Scanning..." : "Scan"}
            </button>
          </div>

          {scanResult && (
            <div style={{ marginTop: 10, color: scanResult.safe ? "#2ecc71" : "#e74c3c" }}>
              <strong>{scanResult.safe ? "✅ Safe" : "⚠️ Unsafe"}</strong>
              <p>{scanResult.reason}</p>
            </div>
          )}
        </div>

        {/* History */}
        <div className="card">
          <div className="card-title">Scan History</div>
          <button onClick={handleClearHistory} style={{ marginBottom: "10px" }}>
            Clear History
          </button>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {history.length === 0 ? (
              <li style={{ color: "#999" }}>No scans yet</li>
            ) : (
              history.map((item, i) => (
                <li key={i} style={{ marginBottom: "6px" }}>
                  <strong style={{ color: "#00ff9d" }}>{item.url}</strong> —{" "}
                  <span style={{ color: item.safe ? "#2ecc71" : "#e74c3c" }}>
                    {item.safe ? "Safe" : "Unsafe"}
                  </span>
                  <br />
                  <small style={{ color: "#888" }}>{item.reason}</small>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <ProtectionStatus scannedUrl={lastScannedUrl} />
      <AdBlockProtection />
      <CloudSecurityMonitor />

      <div className="footer">
        Made in <span className="highlight">India</span> | Secure Digital Bharat
      </div>
    </div>
  );
}

