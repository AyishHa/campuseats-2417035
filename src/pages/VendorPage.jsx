import { Link, useParams, useSearchParams} from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useCart } from '../hooks/useCart.js'

function VendorPage(){
    const { id } = useParams()
    const { vendors, loading, error, reload } = useVendors()
    const vendor = vendors.find((v) => v.id == id)
    const { addToCart } = useCart()
    const [searchParams, setSearchParams] = useSearchParams()

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error} onRetry={reload} />

    if (!vendor) {
      return (
        <div className="card">
          <h2>Vendor not found</h2>
          <p className="muted">There is no vendor with the id "{id}".</p>
          <Link to="/">Back to vendors</Link>
        </div>
      )
    }

    //FEATURES
    const categories = [...new Set(vendor.menu.map((m) => m.category))]
    const requested = searchParams.get('cat')
    const category = categories.includes(requested) ? requested : 'All'
    //FEATURES
    function handleCategoryChange(cat) {
  if (cat === 'All') {
    setSearchParams({})
  } else {
    setSearchParams({ cat })
  }
  }//FEATURES
    const visibleItems = vendor.menu.filter(
      (m) => category === 'All' || m.category === category,
    )

    return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">{vendor.location} · Open: {vendor.openHours}</p>
      <CategoryFilter categories={categories} active={category} onChange={handleCategoryChange} />
      <MenuList items={visibleItems} onAdd={addToCart} />
    </section>
  )
}
export default VendorPage
