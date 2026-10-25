import { useState, useEffect } from 'react'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'


function App() {
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)
    const [selectedVendorId, setSelectedVendorId] = useState(null)
    const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
    const [cart, setCart] = useState([]) // lines of { item, qty }
    const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
    const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
    const cartTotal = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    const [lastOrder, setLastOrder] = useState(null)

    function handleAddToCart(item) {
      setCart((prev) => {
    const exists = prev.find((line) => line.item.id === item.id)
    if (exists) {
      return prev.map((line) =>
        line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line)
    }
    return [...prev, { item, qty: 1 }]
  })
}
function handleChangeQty(itemId, delta) {
  setCart((prev) =>
    prev
      .map((line) => (line.item.id === itemId ? { ...line, qty: line.qty + delta } : line))
      .filter((line) => line.qty > 0))
}
function handleRemove(itemId) {
  setCart((prev) => prev.filter((line) => line.item.id !== itemId))
}

    function handlePlaceOrder(details) {
const total = 0 
setLastOrder({ ...details, total: cartTotal })
setCart([])
setView('done')
}
function handleRetry() {
  setError(null)       // without this, the old error stays on screen after a successful retry
  setLoading(true)
  setReloadKey((k) => k + 1)
}
    let content
if (view === 'cart') {
content = (
    <CartPage cart={cart} onChangeQty={handleChangeQty}
        onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
    )
} else if (view === 'done') {
    content = lastOrder && (
      <div className="card">
        <h2>Order placed</h2>
        <p>Thanks, {lastOrder.name}! Pickup at Mahallah {lastOrder.mahallah}, {lastOrder.pickupTime}.</p>
        <p>Total: RM {lastOrder.total.toFixed(2)}</p>
      </div> 
    )
} else if (loading) {
    content = <Loading />
} else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRetry} />
} else {
    content = selectedVendor && (
  <>
    <section>
     <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor}
            isSelected={vendor.id === selectedVendorId} onSelect={setSelectedVendorId} />
        ))}
      </div>
    </section>
    <section>
      <h2 className="section-title">Menu: {selectedVendor.name}</h2>
      <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
    </section>
  </>
)
}

useEffect(() => {
  const controller = new AbortController()
  fetch('/api/vendors.json', { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    })
    .then((data) => {
      setVendors(data)
      setSelectedVendorId((current) => current ?? data[0].id)
    })
    .catch((err) => { if (err.name !== 'AbortError') setError(err.message) })
    .finally(() => { if (!controller.signal.aborted) setLoading(false) })
  return () => controller.abort()
}, [reloadKey])
return (
<>
<Header cartCount={cartCount}
onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
<main className="container">{content}</main>
<Footer />
</>
)
}
export default App