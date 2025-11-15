// popup/src/utils/storage.js
const MAX_HISTORY = 200;
const STORAGE_KEY = "scanHistory";

export function saveScanHistoryEntry(entry) {
  // entry: { url, safe, reason, time }
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get({ [STORAGE_KEY]: [] }, (res) => {
      const arr = res[STORAGE_KEY] || [];
      arr.unshift(entry);
      chrome.storage.local.set({ [STORAGE_KEY]: arr.slice(0, MAX_HISTORY) });
    });
  } else {
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    arr.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(0, MAX_HISTORY)));
  }
}

export function loadScanHistory() {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    return new Promise((resolve) => {
      chrome.storage.local.get({ [STORAGE_KEY]: [] }, (res) => resolve(res[STORAGE_KEY] || []));
    });
  } else {
    return Promise.resolve(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  }
}

export function clearScanHistory() {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ [STORAGE_KEY]: [] });
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}
