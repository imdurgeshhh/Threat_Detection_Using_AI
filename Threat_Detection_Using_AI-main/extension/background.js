// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Threat Detection Extension installed.");
// });

// // Listen for URL changes to check malicious sites
// chrome.webNavigation.onCompleted.addListener((details) => {
//   console.log("Visited:", details.url);
//   // TODO: Call backend API for threat check
// });


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkUrl") {
    fetch("http://localhost:5000/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: message.url })
    })
    .then(res => res.json())
    .then(data => {
      sendResponse({ result: data });
    })
    .catch(err => {
      sendResponse({ error: err.message });
    });

    return true; // IMPORTANT: keeps the channel open for async sendResponse
  }
});

