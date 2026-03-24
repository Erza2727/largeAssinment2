// "use client";

// import { useCheckout } from "@/app/context/CheckoutContext";
// import { submitOrder } from "./actions";
// import { useRouter } from "next/navigation";

// export default function ReviewPage() {
//   const { data } = useCheckout();
//   const router = useRouter();

//   return (
//     <main className="mx-auto max-w-3xl px-6 py-10">
//       <p className="mb-4 text-sm text-gray-500">Step 3 of 3 — Review</p>
//       <h1 className="mb-8 text-4xl font-bold">Review Order</h1>

//       <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
//         <p>
//           <strong>Name:</strong> {data.name}
//         </p>
//         <p>
//           <strong>Phone:</strong> {data.telephone}
//         </p>
//         <p>
//           <strong>Delivery:</strong> {data.deliveryType}
//         </p>

//         {data.deliveryType === "delivery" && (
//           <>
//             <p>
//               <strong>Address:</strong> {data.address}
//             </p>
//             <p>
//               <strong>City:</strong> {data.city}
//             </p>
//             <p>
//               <strong>Postal Code:</strong> {data.postalCode}
//             </p>
//           </>
//         )}

//         <form action={submitOrder} className="pt-4 flex justify-between">
//           <input type="hidden" name="order" value={JSON.stringify(data)} />

//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="rounded-md border px-4 py-2 hover:bg-gray-100"
//           >
//             Back
//           </button>

//           <button
//             type="submit"
//             className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
//           >
//             Confirm Order
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }
"use client";

import { useEffect } from "react";
import { useCheckout } from "@/app/context/CheckoutContext";
import { submitOrder } from "./actions";
import { useRouter } from "next/navigation";
import { getCart } from "@/lib/cart";

/** * ReviewPage component allows users to review their order details before confirming the purchase.
 * It displays the user's information, delivery method, and the products in the cart along with the total price.
 * The component also handles the submission of the order by sending the data to the API and redirecting to the success page.
 */
export default function ReviewPage() {
  const { data, setData } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (data.cartItems.length === 0) {
      const cart = getCart();
      setData({ cartItems: cart });
    }
  }, [data.cartItems.length, setData]);

  const totalPrice = data.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="mb-4 text-sm text-gray-500">Step 3 of 3 — Review</p>
      <h1 className="mb-8 text-4xl font-bold">Review Order</h1>

      <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
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

        <div>
          <h2 className="mb-2 text-xl font-semibold">Products</h2>

          {data.cartItems.length === 0 ? (
            <p className="text-gray-600">No products in cart.</p>
          ) : (
            <ul className="space-y-2">
              {data.cartItems.map((item) => (
                <li key={item.id} className="rounded-md border p-3">
                  <p className="font-medium">{item.name}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-lg font-bold">Total price: ${totalPrice}</p>

        <form action={submitOrder} className="flex justify-between pt-4">
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
