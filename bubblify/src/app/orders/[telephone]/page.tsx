import { notFound } from "next/navigation";
import { getOrdersByTelephone } from "@/lib/orders";

interface OrderDetailsPageProps {
  /** params object containing the telephone number used to fetch the corresponding orders */
  params: Promise<{
    telephone: string;
  }>;
}
/** * OrderDetailsPage component displays the details of orders associated with a specific telephone number.
 * It fetches the orders using the getOrdersByTelephone function and renders the order information, including customer details and the list of products in each order.
 * If no orders are found for the given telephone number, it triggers a 404 not found response.
 * @param {OrderDetailsPageProps} props - The props containing the URL parameters with the telephone number to fetch orders for.
 */
export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { telephone } = await params;
  const orders = await getOrdersByTelephone(telephone);

  if (!orders || orders.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">Orders for {telephone}</h1>

      <div className="space-y-6">
        {orders.map((order, index) => {
          const totalPrice = order.cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          );

          return (
            <div
              key={index}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <div className="mb-4 space-y-2">
                <p>
                  <span className="font-semibold">Name:</span> {order.name}
                </p>
                <p>
                  <span className="font-semibold">Telephone:</span>{" "}
                  {order.telephone}
                </p>
                <p>
                  <span className="font-semibold">Delivery method:</span>{" "}
                  {order.deliveryType}
                </p>

                {order.deliveryType === "delivery" && (
                  <>
                    {order.address && (
                      <p>
                        <span className="font-semibold">Address:</span>{" "}
                        {order.address}
                      </p>
                    )}
                    {order.city && (
                      <p>
                        <span className="font-semibold">City:</span>{" "}
                        {order.city}
                      </p>
                    )}
                    {order.postalCode && (
                      <p>
                        <span className="font-semibold">Postal code:</span>{" "}
                        {order.postalCode}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="mt-6">
                <h2 className="mb-3 text-2xl font-semibold">Products</h2>

                {order.cartItems.length === 0 ? (
                  <p className="text-gray-600">
                    No products found in this order.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {order.cartItems.map((item) => (
                      <li key={item.id} className="rounded-md border p-4">
                        <p className="font-medium">{item.name}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="mt-6 text-xl font-bold">
                Total price: ${totalPrice}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
