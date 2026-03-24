"use client";

import { createContext, useContext, useState } from "react";

type DeliveryType = "pickup" | "delivery";

interface CheckoutData {
  deliveryType: DeliveryType | null;
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  telephone: string;
  cartItems: any[]; // replace with proper type later
}

interface CheckoutContextType {
  data: CheckoutData;
  setData: (data: Partial<CheckoutData>) => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

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
