import dotenv from "dotenv"

dotenv.config()

export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV || "dev",

      // 🔐 AUTH
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
}