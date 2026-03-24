"use client";

import { createContext, useContext, useState } from "react";
import { CartItem } from "@/types/cart";
type DeliveryType = "pickup" | "delivery";

interface CheckoutData {
  /** the chosen delivery type (home delivery or pickup) */
  deliveryType: DeliveryType | null;
  /** the customer's name */
  name: string;
  /** the customer's address (if delivery is selected) */
  address?: string;
  /** the customer's city (if delivery is selected) */
  city?: string;
  /** the customer's postal code (if delivery is selected) */
  postalCode?: string;
  /** the customer's telephone number */
  telephone: string;
  /** the items in the customer's cart at the time of checkout */
  cartItems: CartItem[];
}

interface CheckoutContextType {
  /** the current state of the checkout data, including delivery type, user information, and cart items */
  data: CheckoutData;
  /** a function to update the checkout data state with new information as the user progresses through the checkout steps */
  setData: (data: Partial<CheckoutData>) => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

/** * CheckoutProvider component is a context provider that manages the state of the checkout process.
 * It initializes the checkout data state and provides a function to update this state as the user progresses through the checkout steps.
 * The provider wraps around the components involved in the checkout flow, allowing them to access and modify the checkout data through the context.
 */
export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setState] = useState<CheckoutData>({
    deliveryType: null,
    name: "",
    telephone: "",
    cartItems: [],
  });

  const setData = (newData: Partial<CheckoutData>) => {
    setState((prev) => ({ ...prev, ...newData }));
  };

  return (
    <CheckoutContext.Provider value={{ data, setData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used inside provider");
  return context;
};
