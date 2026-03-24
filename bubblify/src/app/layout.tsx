import "./globals.css";
import Navbar from "@/components/Navbar";
import { CheckoutProvider } from "./context/CheckoutContext";

export const metadata = {
  title: "Bubblify",
  description: "Bubble shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-gray-900">
        <CheckoutProvider>
          <Navbar />
          {children}
        </CheckoutProvider>
      </body>
    </html>
  );
}
