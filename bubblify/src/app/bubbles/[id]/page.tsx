import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

interface BubbleProduct {
  /** unique identifier of product */
  id: number;
  /** name of the bubble product */
  name: string;
  /** description of the bubble product */
  description: string;
  /** price of the bubble product */
  price: number;
  /** image URL of the bubble product */
  image: string;
}

interface BubbleDetailPageProps {
  /** params containing the id of the bubble product to display */
  params: Promise<{
    id: string;
  }>;
}

/** * Fetches the details of a single bubble product by its id from the API.
 * @param {string} id - The unique identifier of the bubble product to fetch.
 * @returns {Promise<BubbleProduct>} A promise that resolves to the bubble product details.
 * @throws Will throw an error if the API request fails or returns a non-ok response.
 */
async function getBubbleById(id: string): Promise<BubbleProduct> {
  const res = await fetch(`http://localhost:3500/api/bubbles/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bubble product");
  }

  return res.json();
}
/** * BubbleDetailPage component displays the details of a single bubble product.
 * It fetches the product data based on the id from the URL parameters and renders
 * the product image, name, description, price, and an Add to Cart button.
 * @param {BubbleDetailPageProps} props - The props containing the URL parameters with the bubble product id.
 */
export default async function BubbleDetailPage({
  params,
}: BubbleDetailPageProps) {
  const { id } = await params;
  const bubble = await getBubbleById(id);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/bubbles"
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← Back to products
      </Link>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="relative mb-6 h-96 w-full">
          <Image
            src={bubble.image}
            alt={bubble.name}
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="mb-4 text-4xl font-bold">{bubble.name}</h1>
        <p className="mb-4 text-lg text-gray-700">{bubble.description}</p>
        <p className="mb-8 text-2xl font-semibold">${bubble.price}</p>|{" "}
        <AddToCartButton
          id={bubble.id}
          name={bubble.name}
          price={bubble.price}
          image={bubble.image}
        />
      </div>
    </main>
  );
}
