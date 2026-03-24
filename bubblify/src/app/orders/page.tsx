import { redirect } from "next/navigation";
import { getOrdersByTelephone } from "@/lib/orders";

interface OrdersPageProps {
  /** searchParams object containing the telephone number used to fetch the corresponding orders */
  searchParams: Promise<{
    telephone?: string;
  }>;
}

/** * OrdersPage component allows users to search for their past orders using their telephone number.
 * It checks if there are any orders associated with the provided telephone number and redirects to the order details page if found.
 * If no orders are found, it displays a message indicating that there are no orders associated with that telephone number.
 * @param {OrdersPageProps} props - The props containing the search parameters with the telephone number to search for orders.
 */
export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { telephone } = await searchParams;

  if (telephone) {
    const orders = await getOrdersByTelephone(telephone);

    if (orders && orders.length > 0) {
      redirect(`/orders/${telephone}`);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-4xl font-bold">Find Past Orders</h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <form className="space-y-4">
          <label htmlFor="telephone" className="block text-lg font-medium">
            Enter your telephone number
          </label>

          <input
            id="telephone"
            name="telephone"
            type="text"
            placeholder="5812345"
            className="w-full rounded-md border px-4 py-2"
            required
          />

          <button
            type="submit"
            className="rounded-md bg-black px-5 py-2 text-white hover:bg-gray-800"
          >
            Search orders
          </button>
        </form>

        {telephone && (
          <p className="mt-4 text-red-600">
            There is no order associated with that telephone number.
          </p>
        )}
      </div>
    </main>
  );
}
