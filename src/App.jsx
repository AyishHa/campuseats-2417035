import vendors from './data/vendors.js'
import Header from './components/Header.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
const [cart, setCart] = useState([])
function handleAddToCart(item) {
setCart((prevCart) => [...prevCart, item]) // a NEW array, never cart.push()
}

function App() {
const selectedVendor = vendors[0]
return (
<>
<Header cartCount={cart.length} />
<main className="container">
<section>
<h2 className="section-title">Menu: {selectedVendor.name}</h2>
<MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
</section>
</main>
<Footer />
</>
)
}
export default App