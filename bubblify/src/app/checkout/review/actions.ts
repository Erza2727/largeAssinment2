"use server";

import { redirect } from "next/navigation";

export async function submitOrder(formData: FormData) {
  const order = JSON.parse(formData.get("order") as string);

  await fetch("http://localhost:3500/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  redirect("/checkout/success");
}
