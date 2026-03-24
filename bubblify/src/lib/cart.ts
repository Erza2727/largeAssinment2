import { CartItem } from "@/types/cart";

const CART_KEY = "bubblify-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCart = localStorage.getItem(CART_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();

  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function increaseQuantity(id: number) {
  const cart = getCart();

  const item = cart.find((cartItem) => cartItem.id === id);

  if (item) {
    item.quantity += 1;
    saveCart(cart);
  }
}

export function decreaseQuantity(id: number) {
  const cart = getCart();

  const item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    return;
  }

  if (item.quantity > 1) {
    item.quantity -= 1;
    saveCart(cart);
  } else {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
    saveCart(updatedCart);
  }
}

export function removeFromCart(id: number) {
  const cart = getCart();
  const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
  saveCart(updatedCart);
}