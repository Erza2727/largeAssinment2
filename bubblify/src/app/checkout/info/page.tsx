"use client";

import { useCheckout } from "@/app/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InfoPage() {
  const { data, setData } = useCheckout();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    telephone: "",
  });

  const handleSubmit = () => {
    // ✅ Validation
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
    <div>
      <h1>Enter Info</h1>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Telephone"
        onChange={(e) => setForm({ ...form, telephone: e.target.value })}
      />

      {data.deliveryType === "delivery" && (
        <>
          <input
            placeholder="Address"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            placeholder="City"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            placeholder="Postal Code"
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          />
        </>
      )}

      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}
