export function formatPrice(price: number, period?: string | null) {
  const formatted = new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(price);
  return period === "month" ? `${formatted} / month` : formatted;
}

export function formatArea(sqm: number) {
  return `${new Intl.NumberFormat("de-CH").format(sqm)} m²`;
}
