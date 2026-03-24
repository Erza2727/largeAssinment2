"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "@/app/context/CheckoutContext";

export default function DeliveryPage() {
  const { setData } = useCheckout();
  const router = useRouter();

  const handleSelect = (type: "pickup" | "delivery") => {
    setData({ deliveryType: type });
    router.push("/checkout/info");
  };

  return (
    <div>
      <h1>Select Delivery Method</h1>
      <button onClick={() => handleSelect("pickup")}>Store Pickup</button>
      <button onClick={() => handleSelect("delivery")}>Home Delivery</button>
    </div>
  );
}
