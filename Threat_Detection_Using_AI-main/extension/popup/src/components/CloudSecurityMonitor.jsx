import React, { useState, useEffect } from "react";

function CloudSecurityMonitor() {
  const [secure, setSecure] = useState(true);
  const [timestamp, setTimestamp] = useState("Just now");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp("Just now");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h3 className="card-title">Cloud Security Monitor</h3>
      <div className="security-status">
        <span className={secure ? "status-secure" : "status-insecure"}>
          {secure ? "Secure" : "Insecure"}
        </span>
        <span className="timestamp">{timestamp}</span>
      </div>
    </div>
  );
}

export default CloudSecurityMonitor;
