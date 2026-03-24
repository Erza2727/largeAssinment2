"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  decreaseQuantity,
  getCart,
  increaseQuantity,
  removeFromCart,
} from "@/lib/cart";
import { CartItem } from "@/types/cart";

/** * CartPage component displays the items currently in the user's cart.
 * It allows users to increase or decrease the quantity of each item, remove items from the cart,
 * and view the total price of their order. If the cart is empty, it shows a message and a link to continue shopping.
 */
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  /** * Refreshes the cart items state by fetching the latest cart data from local storage.
   * This function is called after any operation that modifies the cart to ensure the UI stays in sync with the cart data.
   */
  function refreshCart() {
    setCartItems(getCart());
  }
  /** * Handles the increase quantity action for a cart item.
   * It calls the increaseQuantity function from the cart library and then refreshes the cart state.
   * @param {number} id - The unique identifier of the cart item to increase the quantity of.
   */
  function handleIncrease(id: number) {
    increaseQuantity(id);
    refreshCart();
  }
  /** * Handles the decrease quantity action for a cart item.
   * It calls the decreaseQuantity function from the cart library and then refreshes the cart state.
   * @param {number} id - The unique identifier of the cart item to decrease the quantity of.
   */
  function handleDecrease(id: number) {
    decreaseQuantity(id);
    refreshCart();
  }
  /** * Handles the remove item action for a cart item.
   * It calls the removeFromCart function from the cart library and then refreshes the cart state.
   * @param {number} id - The unique identifier of the cart item to remove from the cart.
   */
  function handleRemove(id: number) {
    removeFromCart(id);
    refreshCart();
  }

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="mb-4 text-lg text-gray-700">Your cart is empty.</p>
          <Link
            href="/bubbles"
            className="inline-block rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm md:flex-row md:items-center"
            >
              <div className="relative h-32 w-full md:w-32">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="mt-1 text-gray-700">Price: ${item.price}</p>
                <p className="mt-1 text-gray-700">
                  Subtotal: ${item.price * item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="rounded-md border px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>

                <span className="min-w-8 text-center">{item.quantity}</span>

                <button
                  onClick={() => handleIncrease(item.id)}
                  className="rounded-md border px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>
            <p className="mb-6 text-xl">Total: ${totalPrice}</p>

            <Link
              href="/checkout/delivery"
              className="inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
