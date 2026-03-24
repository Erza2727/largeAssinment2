import { CartItem } from "@/types/cart";

export interface Order {
  deliveryType: "pickup" | "delivery";
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  telephone: string;
  cartItems: CartItem[];
}

export async function getOrdersByTelephone(
  telephone: string
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