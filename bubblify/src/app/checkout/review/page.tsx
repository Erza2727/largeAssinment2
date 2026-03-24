"use client";

import { useCheckout } from "@/app/context/CheckoutContext";
import { submitOrder } from "./actions";

export default function ReviewPage() {
  const { data } = useCheckout();

  return (
    <div>
      <h1>Review Order</h1>

      <p>Name: {data.name}</p>
      <p>Phone: {data.telephone}</p>
      <p>Delivery: {data.deliveryType}</p>

      <form action={submitOrder}>
        <input type="hidden" name="order" value={JSON.stringify(data)} />
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
}
