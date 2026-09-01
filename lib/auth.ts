import { cookies } from "next/headers";

export const ADMIN_COOKIE = "newhome_admin";
export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "newhome2026";

export async function isAdmin() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === "granted";
}
