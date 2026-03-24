/** * CartItem interface defines the structure of an item in the shopping cart for the Bubblify application.
 * It includes properties for the unique identifier, name, price, image URL, and quantity of the item.
 * This interface is used to ensure that all cart items adhere to a consistent format when being added to the cart, displayed in the cart, and processed during checkout.
 */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
