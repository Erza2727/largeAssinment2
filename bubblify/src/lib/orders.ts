import { CartItem } from "@/types/cart";

/** * Order interface defines the structure of an order in the Bubblify application.
 * It includes properties for delivery type, customer information, and the items in the cart at the time of checkout.
 * This interface is used to ensure that all order data adheres to a consistent format when being processed and stored.
 */
export interface Order {
  deliveryType: "pickup" | "delivery";
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  telephone: string;
  cartItems: CartItem[];
}

/** * getOrdersByTelephone function retrieves the orders associated with a specific telephone number from the backend API.
 * It sends a GET request to the API endpoint with the telephone number as a parameter and returns the order data if the request is successful.
 * If the request fails or if no orders are found for the given telephone number, it returns null.
 * This function is used to fetch and display the order history for a customer based on their telephone number, allowing them to view their past orders and details.
 * @param {string} telephone - The telephone number used to fetch the corresponding orders from the API.
 * @returns {Promise<Order[] | null>} A promise that resolves to an array of Order objects if successful, or null if no orders are found or if the request fails.
 */
export async function getOrdersByTelephone(
  telephone: string,
): Promise<Order[] | null> {
  const res = await fetch(`http://localhost:3500/orders/${telephone}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  if (!data) {
    return null;
  }

  if (Array.isArray(data)) {
    return data.length > 0 ? data : null;
  }

  return [data];
}
