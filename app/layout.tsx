import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Bingwa Magari — Tanzania's Most Trusted Car Marketplace",
  description: "Find verified vehicles, sell your car, or book an inspection — all in one place. Bingwa Magari is Tanzania's premier automotive dealership and marketplace.",
  metadataBase: new URL("https://bingwamagari.co.tz"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative font-sans bg-surface-base'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
