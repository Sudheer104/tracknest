// const { defineConfig } = require("drizzle-kit");
// // const dotenv = require("dotenv");
// // const path = require("path");

// // // Load .env file explicitly
// // dotenv.config({ path: path.resolve(__dirname, ".env") });

// // console.log("Loaded DB URL:", process.env.DATABASE_URL);

// module.exports = defineConfig({
//   out: "./drizzle",
//   dialect: "postgresql",
//   schema: "./utils/schema.jsx",
//   dbCredentials: {
//     url: process.env.DATABASE_URL,
//   },
// });



import { defineConfig } from "drizzle-kit";
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env.local") });
export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  // driver: "pglite",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  }
});
