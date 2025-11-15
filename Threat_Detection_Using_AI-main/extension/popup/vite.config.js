// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   root: "./",
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   root: "./",
//   build: {
//     outDir: "dist", // ensures build goes to popup/dist
//   },
// });

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   root: "./",
//   build: {
//     outDir: "dist", // ensures build goes to popup/dist
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   root: "./",
//   build: {
//     outDir: "dist",
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [
//     react({
//       fastRefresh: false, // 🚀 disable react-refresh to fix preamble issue
//     }),
//   ],
//   build: {
//     outDir: "dist",
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [
//     react({
//       // 🚫 disable React fast refresh (fixes preamble issue in extension)
//       jsxRuntime: "classic",
//       babel: {
//         plugins: [],
//       },
//       fastRefresh: false,
//     }),
//   ],
//   build: {
//     outDir: "dist",
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for Chrome extension + React
export default defineConfig({
  plugins: [
    react({
      fastRefresh: false, // 🚫 disables preamble problem
    }),
  ],
  build: {
    outDir: "dist",
  },
});


