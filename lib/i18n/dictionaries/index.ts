import type { Locale } from "../config";
import en from "./en";
import fa from "./fa";
import ps from "./ps";

export type { Dictionary } from "./en";

export const dictionaries: Record<Locale, typeof en> = { en, fa, ps };
