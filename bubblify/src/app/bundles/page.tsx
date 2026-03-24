import Image from "next/image";

interface BubbleProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Bundle {
  id: number;
  name: string;
  items: number[];
}

async function getBundles(): Promise<Bundle[]> {
  const res = await fetch("http://localhost:3500/api/bundles", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bundles");
  }

  return res.json();
}

async function getBubbles(): Promise<BubbleProduct[]> {
  const res = await fetch("http://localhost:3500/api/bubbles", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bubble products");
  }

  return res.json();
}

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
            0
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

              <p className="mb-3 text-lg font-medium">Total price: ${totalPrice}</p>

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

              <button className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
                Add Bundle to Cart
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}