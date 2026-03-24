"use client";

import { addToCart } from "@/lib/cart";

interface AddToCartButtonProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
}: AddToCartButtonProps) {
  function handleAddToCart() {
    addToCart({
      id,
      name,
      price,
      image,
    });

    alert(`${name} was added to your cart.`);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
    >
      Add to cart
    </button>
  );
}