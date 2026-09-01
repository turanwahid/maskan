"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "newhome_favorites";

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const onStorage = () => setIds(readStorage());
    onStorage();
    window.addEventListener("storage", onStorage);
    window.addEventListener("favorites-changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("favorites-changed", onStorage);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const current = readStorage();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("favorites-changed"));
    setIds(next);
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isFavorite };
}
