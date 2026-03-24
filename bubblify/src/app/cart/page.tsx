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

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  function refreshCart() {
    setCartItems(getCart());
  }

  function handleIncrease(id: number) {
    increaseQuantity(id);
    refreshCart();
  }

  function handleDecrease(id: number) {
    decreaseQuantity(id);
    refreshCart();
  }

  function handleRemove(id: number) {
    removeFromCart(id);
    refreshCart();
  }

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
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