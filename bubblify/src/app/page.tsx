import Link from "next/link";

/** * HomePage component serves as the landing page for the Bubblify application.
 * It provides a welcoming message and a call-to-action button that directs users to the products page where they can browse the available bubble products.
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-5xl font-bold">Welcome to Bubblify</h1>
      <p className="mb-6 text-lg text-gray-700">
        Your one-stop shop for bubble products, bundles, and more.
      </p>

      <Link
        href="/bubbles"
        className="inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
      >
        View products
      </Link>
    </main>
  );
}
