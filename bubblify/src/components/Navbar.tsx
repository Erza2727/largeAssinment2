import Image from "next/image";
import Link from "next/link";

/** * Navbar component renders the navigation bar for the Bubblify application.
 * It includes the logo and links to different pages of the application such as Products, Bundles, About us, and Cart.
 * The Navbar is designed to be responsive and provides a consistent navigation experience across all pages of the application.
 * @returns {JSX.Element} The JSX structure of the Navbar component, which includes the logo and navigation links.
 */
export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Bubblify logo" width={40} height={40} />
          <span className="text-2xl font-bold">Bubblify</span>
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 text-lg">
          <Link href="/bubbles" className="hover:underline">
            Products
          </Link>
          <Link href="/bundles" className="hover:underline">
            Bundles
          </Link>
          <Link href="/about" className="hover:underline">
            About us
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}
