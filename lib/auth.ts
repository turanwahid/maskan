import { cookies } from "next/headers";

export const ADMIN_COOKIE = "maskan_admin";
export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "maskan2026";

export async function isAdmin() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === "granted";
}
