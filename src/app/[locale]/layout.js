import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { routing } from "../../i18n/routing";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "1920 | Nour ElDeen",
  description: "نحن نتطور من أجلكم",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const currentLocale = locale ?? routing.defaultLocale;
  const dir = currentLocale === "ar" ? "rtl" : "ltr";

  let messages;
  try {
    messages = (await import(`../../../messages/${currentLocale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${currentLocale}`, error);
    messages = (await import(`../../../messages/ar.json`)).default;
  }

  return (
    <html lang={currentLocale} dir={dir}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
