import { Link, useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import DailySpecial from '../components/DailySpecial.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useCart } from '../hooks/useCart.js'

function VendorPage() {
    const { id } = useParams()
    const { vendors, loading, error, reload } = useVendors()
    const vendor = vendors.find((v) => v.id == id)
    const { addToCart } = useCart()

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

    return (
        <section>
            <h2 className="section-title">Menu: {vendor.name}</h2>
            <p className="muted">{vendor.location} · Open: {vendor.openHours}</p>
            <DailySpecial vendor={vendor} onAdd={addToCart} />
        </section>
    )
}
export default VendorPage
