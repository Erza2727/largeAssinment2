import Image from "next/image";
import Link from "next/link";

interface BubbleProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

async function getBubbles(): Promise<BubbleProduct[]> {
  const res = await fetch("http://localhost:3500/api/bubbles", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bubbles");
  }

  return res.json();
}

export default async function BubblesPage() {
  const bubbles = await getBubbles();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Bubble Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bubbles.map((bubble) => (
          <Link
            key={bubble.id}
            href={`/bubbles/${bubble.id}`}
            className="block border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="relative w-full h-56 mb-4">
              <Image
                src={bubble.image}
                alt={bubble.name}
                fill
                className="object-contain"
              />
            </div>

            <h2 className="text-xl font-semibold mb-2">{bubble.name}</h2>
            <p className="text-gray-700">${bubble.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}