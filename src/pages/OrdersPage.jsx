import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

// Route "/orders": orders placed so far (placeOrder already puts newest first).
function OrdersPage() {
  const { orders } = useCart()

  if (orders == 0) {
    return (
      <p className="muted">
        No orders yet. <Link to="/">Browse vendors</Link>
      </p>
    )
  }

  return (
    <section>
      <h2 className="section-title">My orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <h3>Order #{String(order.id).slice(-6)}</h3>
            <p className="muted">
              Placed {new Date(order.placedAt).toLocaleString()} · for {order.name},
              Mahallah {order.mahallah} · pickup {order.pickupTime}
            </p>
            <ul>
              {order.lines.map((line) => (
                <li key={line.item.id}>
                  {line.qty} × {line.item.name} (RM {(line.item.price * line.qty).toFixed(2)})
                </li>
              ))}
            </ul>
            <p className="price">Total: RM {order.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage
