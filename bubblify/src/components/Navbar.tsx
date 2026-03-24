import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Bubblify logo"
            width={40}
            height={40}
          />
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