"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, ADMIN_PASSCODE, isAdmin } from "./auth";
import {
  getAgents,
  getProperties,
  getSubmissions,
  saveProperties,
  saveSubmissions,
} from "./data";
import type { Property, Submission } from "./types";

export async function loginAdmin(formData: FormData) {
  const passcode = String(formData.get("passcode") ?? "");
  const store = await cookies();
  if (passcode === ADMIN_PASSCODE) {
    store.set(ADMIN_COOKIE, "granted", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    redirect("/admin");
  }
  redirect("/admin?error=1");
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}

function propertyFromFormData(formData: FormData, existing?: Property): Property {
  const num = (key: string) => Number(formData.get(key) ?? 0);
  const str = (key: string) => String(formData.get(key) ?? "").trim();

  const listingType = str("listingType") as Property["listingType"];

  return {
    id: existing?.id ?? `p${Date.now()}`,
    title: str("title"),
    listingType,
    propertyType: str("propertyType") as Property["propertyType"],
    price: num("price"),
    pricePeriod: listingType === "rent" ? "month" : null,
    rooms: num("rooms"),
    bedrooms: num("bedrooms"),
    bathrooms: num("bathrooms"),
    livingSpace: num("livingSpace"),
    plotSpace: num("plotSpace") || undefined,
    yearBuilt: num("yearBuilt") || undefined,
    address: {
      street: str("street"),
      zip: str("zip"),
      city: str("city"),
      canton: str("canton"),
      lat: Number(formData.get("lat")) || 46.8182,
      lng: Number(formData.get("lng")) || 8.2275,
    },
    description: str("description"),
    features: str("features")
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean),
    images: str("images")
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean),
    agentId: str("agentId"),
    featured: formData.get("featured") === "on",
    status: str("status") as Property["status"],
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
}

export async function createProperty(formData: FormData) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const properties = await getProperties();
  const agents = await getAgents();

  const draft = propertyFromFormData(formData);
  if (!draft.agentId) draft.agentId = agents[0]?.id ?? "";
  if (draft.images.length === 0) {
    draft.images = [1, 2, 3].map(
      (n) => `https://picsum.photos/seed/${draft.id}-${n}/1200/800`
    );
  }

  await saveProperties([draft, ...properties]);
  revalidatePath("/admin");
  revalidatePath("/listings");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProperty(id: string, formData: FormData) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const properties = await getProperties();
  const existing = properties.find((p) => p.id === id);
  if (!existing) throw new Error("Not found");

  const updated = propertyFromFormData(formData, existing);
  await saveProperties(properties.map((p) => (p.id === id ? updated : p)));
  revalidatePath("/admin");
  revalidatePath("/listings");
  revalidatePath(`/listings/${id}`);
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteProperty(formData: FormData) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const id = String(formData.get("id"));
  const properties = await getProperties();
  await saveProperties(properties.filter((p) => p.id !== id));
  revalidatePath("/admin");
  revalidatePath("/listings");
  revalidatePath("/");
}

export async function submitPropertyListing(formData: FormData) {
  const num = (key: string) => Number(formData.get(key) ?? 0);
  const str = (key: string) => String(formData.get(key) ?? "").trim();

  const submission: Submission = {
    id: `s${Date.now()}`,
    ownerName: str("ownerName"),
    ownerEmail: str("ownerEmail"),
    ownerPhone: str("ownerPhone"),
    listingType: str("listingType") as Submission["listingType"],
    propertyType: str("propertyType") as Submission["propertyType"],
    price: num("price"),
    rooms: num("rooms"),
    livingSpace: num("livingSpace"),
    address: {
      street: str("street"),
      zip: str("zip"),
      city: str("city"),
      canton: str("canton"),
    },
    description: str("description"),
    createdAt: new Date().toISOString(),
  };

  const submissions = await getSubmissions();
  await saveSubmissions([submission, ...submissions]);
  revalidatePath("/admin");
  redirect("/list-property?success=1");
}

export async function dismissSubmission(formData: FormData) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const id = String(formData.get("id"));
  const submissions = await getSubmissions();
  await saveSubmissions(submissions.filter((s) => s.id !== id));
  revalidatePath("/admin");
}
