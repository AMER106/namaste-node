// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

import zod from "zod";

const envSchema = zod.object({
  // PORT (optional) → defaults to 5000

  // MongoDB connection string (required)
  DB_URL: zod.string().min(1, "DB_URL is required"),
});

/*
   VALIDATE ENV VARIABLES
   - safeParse checks process.env
   - Returns { success: true, data } if valid
   - Returns { success: false, error } if invalid
*/
const env = envSchema.safeParse(process.env);

// If validation fails → log error + stop app
if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error.format());
  process.exit(1);
}

// Export validated environment variables
export default env;
