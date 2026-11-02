import { CartContext } from "../context/cart-context";
import { useContext } from "react";

export function useCart() {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}