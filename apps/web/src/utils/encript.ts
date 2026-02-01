import type { LoginOutput } from "@finance/validations";
import CryptoJS from "crypto-js";
import { env } from "@/env/config";

export const SECRET_KEY = env.NEXT_PUBLIC_COOKIE_SECRET || "default_secret_key";

export function encryptUser(user: LoginOutput) {
  return CryptoJS.AES.encrypt(JSON.stringify(user), SECRET_KEY).toString();
}

export function decryptUser(user?: string): LoginOutput | null {
  if (!user) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(user, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted) as LoginOutput;
  } catch {
    return null;
  }
}
