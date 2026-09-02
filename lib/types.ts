export type ListingType = "buy" | "rent";

export type PropertyType =
  | "apartment"
  | "house"
  | "villa"
  | "chalet"
  | "penthouse"
  | "land"
  | "commercial";

export interface Address {
  street: string;
  zip: string;
  city: string;
  canton: string;
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  title: string;
  listingType: ListingType;
  propertyType: PropertyType;
  price: number;
  pricePeriod?: "month" | null;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  livingSpace: number;
  plotSpace?: number;
  yearBuilt?: number;
  address: Address;
  description: string;
  features: string[];
  images: string[];
  agentId: string;
  featured: boolean;
  status: "available" | "reserved" | "sold";
  createdAt: string;
}

export interface Submission {
  id: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  listingType: ListingType;
  propertyType: PropertyType;
  price: number;
  rooms: number;
  livingSpace: number;
  address: {
    street: string;
    zip: string;
    city: string;
    canton: string;
  };
  description: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  agency: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
}
