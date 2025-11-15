import React, { useState } from "react";

function AdBlockProtection() {
  const [enabled, setEnabled] = useState(true);
  const [ads, setAds] = useState(1247);
  const [trackers, setTrackers] = useState(89);

  const toggleAdBlock = () => {
    setEnabled(!enabled);
    if (!enabled) {
      setAds(ads + Math.floor(Math.random() * 10));
      setTrackers(trackers + Math.floor(Math.random() * 3));
    }
  };

  return (
    <div className="card">
      <h3 className="card-title">Ad Block Protection</h3>
      <div className="toggle-container">
        <span>Enable Ad Blocker</span>
        <div
          className={`toggle-switch ${enabled ? "active" : ""}`}
          onClick={toggleAdBlock}
        >
          <div className="toggle-slider"></div>
        </div>
      </div>
      <div className="adblock-stats">
        Blocked: {ads} ads, {trackers} trackers
      </div>
    </div>
  );
}

export default AdBlockProtection;
