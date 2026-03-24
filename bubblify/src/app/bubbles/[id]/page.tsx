import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

interface BubbleProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface BubbleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBubbleById(id: string): Promise<BubbleProduct> {
  const res = await fetch(`http://localhost:3500/api/bubbles/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bubble product");
  }

  return res.json();
}

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

        <p className="mb-8 text-2xl font-semibold">${bubble.price}</p>

        | <AddToCartButton
            id={bubble.id}
            name={bubble.name}
            price={bubble.price}
            image={bubble.image}
          />
      </div>
    </main>
  );
}