"use client";

import { useCheckout } from "@/app/context/CheckoutContext";
import { submitOrder } from "./actions";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const { data } = useCheckout();
  const router = useRouter();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="mb-4 text-sm text-gray-500">Step 3 of 3 — Review</p>
      <h1 className="mb-8 text-4xl font-bold">Review Order</h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Phone:</strong> {data.telephone}
        </p>
        <p>
          <strong>Delivery:</strong> {data.deliveryType}
        </p>

        {data.deliveryType === "delivery" && (
          <>
            <p>
              <strong>Address:</strong> {data.address}
            </p>
            <p>
              <strong>City:</strong> {data.city}
            </p>
            <p>
              <strong>Postal Code:</strong> {data.postalCode}
            </p>
          </>
        )}

        <form action={submitOrder} className="pt-4 flex justify-between">
          <input type="hidden" name="order" value={JSON.stringify(data)} />

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            Back
          </button>

          <button
            type="submit"
            className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </main>
  );
}
