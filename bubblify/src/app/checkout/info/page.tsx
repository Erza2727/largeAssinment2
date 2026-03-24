"use client";

import { useCheckout } from "@/app/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** * InfoPage component collects the user's information during the checkout process.
 * It displays a form with fields for name, telephone, and if delivery is selected, address, city, and postal code.
 * The component validates the input and saves the data to the CheckoutContext before navigating to the review step.
 */
export default function InfoPage() {
  const { data, setData } = useCheckout();
  const router = useRouter();

  //persistence of data previously entered by user
  const [form, setForm] = useState({
    name: data.name || "",
    address: data.address || "",
    city: data.city || "",
    postalCode: data.postalCode || "",
    telephone: data.telephone || "",
  });

  const handleSubmit = () => {
    // Validation
    if (!form.name || !form.telephone) {
      alert("Missing required fields");
      return;
    }

    if (data.deliveryType === "delivery") {
      if (!form.address || !form.city || !form.postalCode) {
        alert("Missing delivery info");
        return;
      }
    }

    setData(form);
    router.push("/checkout/review");
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="mb-4 text-sm text-gray-500">Step 2 of 3 — Information</p>
      <h1 className="mb-8 text-4xl font-bold">Your Information</h1>

      <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <input
          value={form.name}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-md border px-4 py-2"
        />

        <input
          value={form.telephone}
          placeholder="Telephone"
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          className="w-full rounded-md border px-4 py-2"
        />

        {data.deliveryType === "delivery" && (
          <>
            <input
              value={form.address}
              placeholder="Address"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-md border px-4 py-2"
            />

            <input
              value={form.city}
              placeholder="City"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full rounded-md border px-4 py-2"
            />

            <input
              value={form.postalCode}
              placeholder="Postal Code"
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              className="w-full rounded-md border px-4 py-2"
            />
          </>
        )}

        <div className="flex justify-between pt-4">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
