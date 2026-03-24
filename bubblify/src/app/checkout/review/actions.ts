"use server";

import { redirect } from "next/navigation";

/** * submitOrder function handles the submission of the order during the checkout process.
 * It receives the form data, extracts the order information, and sends it to the API endpoint to create a new order.
 * After successfully submitting the order, it redirects the user to the checkout success page.
 * @param {FormData} formData - The form data containing the order information to be submitted.
 */
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
