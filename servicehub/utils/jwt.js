import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn });
};
