import { CartItem } from "@/types/cart";

const CART_KEY = "bubblify-cart";

/** * getCart function retrieves the current state of the shopping cart from local storage.
 * It checks if the code is running in a browser environment and then attempts to fetch the cart data stored under the CART_KEY.
 * If no cart data is found or if there is an error during parsing, it returns an empty array, ensuring that the function always returns a valid array of CartItem objects.
 * @returns {CartItem[]} An array of CartItem objects representing the current items in the shopping cart.
 */
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

/** * saveCart function saves the current state of the shopping cart to local storage.
 * It takes an array of CartItem objects as input and stores it under the CART_KEY in local storage after converting it to a JSON string.
 * This function is used to persist the cart data across page reloads and sessions, allowing users to maintain their cart state as they navigate through the application.
 * @param {CartItem[]} cart - An array of CartItem objects representing the current items in the shopping cart to be saved.
 */
export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/** * addToCart function adds a new item to the shopping cart or increases the quantity if the item already exists in the cart.
 * It takes an object containing the product details (id, name, price, image) as input and updates the cart state accordingly.
 * If the item is already present in the cart, it increments the quantity by 1; otherwise, it adds a new entry to the cart with a quantity of 1.
 * After updating the cart, it calls the saveCart function to persist the changes to local storage, ensuring that the cart state is maintained across page reloads and sessions.
 * @param {Omit<CartItem, "quantity">} item - An object containing the product details (id, name, price, image) to be added to the cart.
 */
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

/** * increaseQuantity function increases the quantity of a specific item in the shopping cart by 1.
 * It takes the unique identifier of the cart item as input, finds the corresponding item in the cart, and increments its quantity.
 * After updating the quantity, it calls the saveCart function to persist the changes to local storage, ensuring that the cart state is maintained across page reloads and sessions.
 * @param {number} id - The unique identifier of the cart item to increase the quantity of.
 */
export function increaseQuantity(id: number) {
  const cart = getCart();

  const item = cart.find((cartItem) => cartItem.id === id);

  if (item) {
    item.quantity += 1;
    saveCart(cart);
  }
}

/** * decreaseQuantity function decreases the quantity of a specific item in the shopping cart by 1.
 * If the quantity of the item becomes 0, it removes the item from the cart entirely.
 * It takes the unique identifier of the cart item as input, finds the corresponding item in the cart, and updates its quantity or removes it if necessary.
 * After updating the cart, it calls the saveCart function to persist the changes to local storage, ensuring that the cart state is maintained across page reloads and sessions.
 * @param {number} id - The unique identifier of the cart item to decrease the quantity of.
 */
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

/** * removeFromCart function removes a specific item from the shopping cart entirely.
 * It takes the unique identifier of the cart item as input, finds the corresponding item in the cart, and removes it from the cart array.
 * After updating the cart, it calls the saveCart function to persist the changes to local storage, ensuring that the cart state is maintained across page reloads and sessions.
 * @param {number} id - The unique identifier of the cart item to remove from the cart.
 */
export function removeFromCart(id: number) {
  const cart = getCart();
  const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
  saveCart(updatedCart);
}
