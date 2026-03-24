"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "@/app/context/CheckoutContext";

/** * DeliveryPage component allows users to select their preferred delivery method (pickup or delivery) during the checkout process.
 * It uses the CheckoutContext to store the selected delivery type and navigates to the next step in the checkout flow after selection.
 */
export default function DeliveryPage() {
  const { data, setData } = useCheckout();
  const router = useRouter();

  const handleSelect = (type: "pickup" | "delivery") => {
    setData({ deliveryType: type });
    router.push("/checkout/info");
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* Step indicator */}
      <p className="mb-4 text-sm text-gray-500">Step 1 of 3 — Delivery</p>

      <h1 className="mb-8 text-4xl font-bold">Select Delivery Method</h1>

      <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        {/* Pickup option */}
        <button
          onClick={() => handleSelect("pickup")}
          className={`w-full rounded-md border p-4 text-left transition hover:bg-gray-50 ${
            data.deliveryType === "pickup" ? "border-black" : ""
          }`}
        >
          <h2 className="text-lg font-semibold">Store Pickup</h2>
          <p className="text-sm text-gray-600">
            Pick up your bubbles from our store.
          </p>
        </button>

        {/* Delivery option */}
        <button
          onClick={() => handleSelect("delivery")}
          className={`w-full rounded-md border p-4 text-left transition hover:bg-gray-50 ${
            data.deliveryType === "delivery" ? "border-black" : ""
          }`}
        >
          <h2 className="text-lg font-semibold">Home Delivery</h2>
          <p className="text-sm text-gray-600">
            Get your bubbles delivered to your door.
          </p>
        </button>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => router.back()}
            className="rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            Back
          </button>

          {/* Optional continue button (if already selected) */}
          {data.deliveryType && (
            <button
              onClick={() => router.push("/checkout/info")}
              className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
