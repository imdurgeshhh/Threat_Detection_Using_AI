import React, { useState } from "react";

function WebsiteScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      alert(data.safe ? "✅ Safe Website" : "⚠️ Unsafe Website");
    } catch (err) {
      alert("Error scanning: " + err.message);
    }

    setLoading(false);
    setUrl("");
  };

  return (
    <div className="card">
      <h3 className="card-title">Website Safety Scanner</h3>
      <form className="scanner-form" onSubmit={handleScan}>
        <input
          type="url"
          className="url-input"
          placeholder="Enter website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="scan-btn" disabled={loading}>
          {loading ? "Scanning..." : "Scan"}
        </button>
      </form>
    </div>
  );
}

export default WebsiteScanner;
