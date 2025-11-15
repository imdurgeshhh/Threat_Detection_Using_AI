
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchWithTimeout(url, opts = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} - ${text}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    if (err.name === "AbortError") throw new Error("Request timed out");
    throw err;
  }
}

export async function fetchProtectionStatus() {
  try {
    const response = await fetch("http://localhost:5000/status");
    if (!response.ok) throw new Error("Server error");
    return await response.json();
  } catch (error) {
    console.error("Protection status fetch failed:", error);
    return { safe: false, score: 0, message: "Server offline or error" };
  }
}
