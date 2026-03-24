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

interface Bundle {
  /** unique identifier of bundle */
  id: number;
  /** name of the bundle product */
  name: string;
  /** array of bubble product ids included in the bundle */
  items: number[];
}
/** * Fetches a list of bundle products from the API.
 * @returns {Promise<Bundle[]>} A promise that resolves to an array of bundle products.
 * @throws Will throw an error if the API request fails or returns a non-ok response.
 */
async function getBundles(): Promise<Bundle[]> {
  const res = await fetch("http://localhost:3500/api/bundles", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bundles");
  }

  return res.json();
}

/** * Fetches a list of bubble products from the API.
 * @returns {Promise<BubbleProduct[]>} A promise that resolves to an array of bubble products.
 * @throws Will throw an error if the API request fails or returns a non-ok response.
 */
async function getBubbles(): Promise<BubbleProduct[]> {
  const res = await fetch("http://localhost:3500/api/bubbles", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bubble products");
  }

  return res.json();
}

/** * BundlesPage component displays a list of bundle products fetched from the API.
 * Each bundle is displayed with its name, included products, total price, and an Add to Cart button.
 * It fetches both bundles and bubble products to calculate the details of each bundle.
 */
export default async function BundlesPage() {
  const [bundles, bubbles] = await Promise.all([getBundles(), getBubbles()]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">Bundle Products</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bundles.map((bundle) => {
          const includedProducts = bundle.items
            .map((itemId) => bubbles.find((bubble) => bubble.id === itemId))
            .filter((bubble): bubble is BubbleProduct => Boolean(bubble));

          const totalPrice = includedProducts.reduce(
            (sum, product) => sum + product.price,
            0,
          );

          return (
            <div
              key={bundle.id}
              className="rounded-lg border bg-white p-5 shadow-sm"
            >
              <h2 className="mb-3 text-2xl font-semibold">{bundle.name}</h2>

              <div className="mb-4 grid grid-cols-2 gap-3">
                {includedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-md border p-2 text-center"
                  >
                    <div className="relative mx-auto mb-2 h-24 w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm font-medium">{product.name}</p>
                  </div>
                ))}
              </div>

              <p className="mb-3 text-lg font-medium">
                Total price: ${totalPrice}
              </p>

              <div className="mb-5">
                <h3 className="mb-2 font-semibold">Included products:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {includedProducts.map((product) => (
                    <li key={product.id}>
                      {product.name} — ${product.price}
                    </li>
                  ))}
                </ul>
              </div>

              <AddToCartButton
                id={bundle.id}
                name={bundle.name}
                price={totalPrice}
                image={includedProducts[0]?.image || "/placeholder.png"}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
