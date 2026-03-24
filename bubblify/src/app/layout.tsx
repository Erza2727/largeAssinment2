import "./globals.css";
import Navbar from "@/components/Navbar";
import { CheckoutProvider } from "./context/CheckoutContext";
/** * Metadata for the Bubblify application, including the title and description that will be used in the HTML head for SEO and display purposes. */
export const metadata = {
  title: "Bubblify",
  description: "Bubble shop",
};
/** * RootLayout component serves as the main layout for the Bubblify application.
 * It wraps the entire application with the CheckoutProvider to manage the checkout state and includes the Navbar component for navigation.
 * The layout also defines the HTML structure and applies global styles to ensure a consistent look and feel across all pages.
 * @param {Object} props - The properties passed to the RootLayout component, including the children elements that will be rendered within the layout.
 * @returns {JSX.Element} The JSX structure of the RootLayout component, including the HTML and body tags, and the wrapped children components.
 */
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
