// Example: detect insecure forms
document.addEventListener("submit", (e) => {
  if (window.location.protocol !== "https:") {
    alert("⚠️ Warning: You are submitting data over an insecure connection!");
  }
});
