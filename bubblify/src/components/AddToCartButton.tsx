"use client";

import { addToCart } from "@/lib/cart";

interface AddToCartButtonProps {
  /** the unique identifier of the product to be added to the cart */
  id: number;
  /** the name of the product to be added to the cart */
  name: string;
  /** the price of the product to be added to the cart */
  price: number;
  /** the image URL of the product to be added to the cart */
  image: string;
}

/** * AddToCartButton component renders a button that allows users to add a product to their shopping cart.
 * When the button is clicked, it calls the addToCart function with the product details and shows an alert confirming the addition.
 * @param {AddToCartButtonProps} props - The properties containing the product details to be added to the cart.
 * @returns {JSX.Element} The JSX structure of the AddToCartButton component, which is a styled button element.
 */
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
