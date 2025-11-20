import jwt, { SignOptions } from "jsonwebtoken";
import { tokenPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; // e.g., "1d", "2h"

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error(
    "JWT_SECRET or JWT_EXPIRES_IN is not defined in environment variables"
  );
}

/**
 * Generate a JWT token
 * @param payload - object containing the token payload
 * @returns signed JWT token as string
 */
export const generateToken = (payload: tokenPayload): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as `${number}${
      | "s"
      | "m"
      | "h"
      | "d"}`,
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};
