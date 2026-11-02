import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartContext } from "./cart-context";

 
function CartProvider( {children} ){

    const [cart, setCart] = useLocalStorage('cart',[])
    const [orders, setOrders] = useLocalStorage('orders', [])
    const count = cartCount(cart)
    const total = cartTotal(cart)

    function addToCart(item) {
        setCart((prevCart) => {
        const exist = prevCart.some((line) => line.item.id === item.id)
        if (exist) {
          return prevCart.map((line) => 
            line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line)
        }
        return [...prevCart, { item, qty: 1 }]
        })
    }
    function changeQty(itemId, delta) {
        setCart((prevCart) =>
          prevCart
            .map((line) => line.item.id === itemId ? { ...line, qty: line.qty + delta } : line)
            .filter((line) => line.qty > 0)
        )
    }
    function removeFromCart(itemId) {
        setCart((prevCart) =>  prevCart.filter((line) => line.item.id !== itemId)
        )
    }
    function placeOrder(details) {
        const order = {
            id: Date.now(),                       // simple unique id: ms since 1970
            placedAt: new Date().toISOString(),   // text date, safe to save as JSON
            ...details,                           // name, mahallah, pickupTime from the form
            lines: cart,  
            total,                                // SNAPSHOT of the total (same reason)
    }

        setOrders((prev) => [order, ...prev])
        setCart([])
    }
    function cartCount(cart) {
        return cart.reduce((sum, line) => sum + line.qty, 0)
    }
    function cartTotal(cart) {
        return cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    }
    
    const value = { cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export default CartProvider