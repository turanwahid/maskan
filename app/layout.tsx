import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/i18n/get-locale";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { rtlLocales } from "@/lib/i18n/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "maskan demo | Buy & rent property in Switzerland",
  description:
    "A demo real estate marketplace for buying and renting apartments, houses and villas across Switzerland.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const dict = dictionaries[locale];
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${vazirmatn.variable} h-full antialiased`}
      style={{
        // @ts-expect-error custom property
        "--font-sans": dir === "rtl" ? "var(--font-vazirmatn)" : "var(--font-inter)",
      }}
    >
      <body className="flex min-h-full flex-col">
        <Header dict={dict} locale={locale} />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
