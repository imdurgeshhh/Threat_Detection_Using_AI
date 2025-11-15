// Patch to avoid @vitejs/plugin-react preamble errors in Chrome extensions
if (typeof window !== "undefined") {
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => () => {};
}
