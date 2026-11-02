import { Link } from 'react-router'
import MenuList from './MenuList.jsx'

function DailySpecial({ vendors , vendor, onAdd }) {
    const offers = (vendor ? [vendor] : vendors).flatMap((vendor) => {
        const specialId = vendor.dailySpecial?.itemId
        const item = vendor.menu.find((item) => item.available && (!specialId || item.id === specialId))
        return item ? [{ vendor, item: { ...item, originalPrice: item.price, price: Math.round(item.price * 80) / 100 } }] : []
    })

    return (
        <>
            <h2 className="section-title">{vendor ? 'Daily special · 20% off' : "Today's specials"}</h2>
            {offers.length === 0 && <p className="muted">No specials available.</p>}
            <div className={vendor ? 'pinned-special' : 'special-grid'}>
                {offers.map(({ vendor: shop, item }) => {
                    const card = (
                        <article className="card menu-card">
                            <span className="special-tag">Daily special · 20% off</span>
                            <h3>{item.name}</h3>
                            <p className="muted">{vendor ? item.description : shop.name}</p>
                            <p className="price special-price">
                                <del className="special-original">RM {item.originalPrice.toFixed(2)}</del>
                                <strong>RM {item.price.toFixed(2)}</strong>
                            </p>
                            {vendor ? (
                                <button className="btn" onClick={() => onAdd(item)}>Add to cart</button>
                            ) : (
                                <span className="special-link">View vendor menu →</span>
                            )}
                        </article>
                    )
                    return vendor ? <div key={shop.id}>{card}</div> : (
                        <Link key={shop.id} to={`/vendor/${shop.id}`} className="daily-special-card">{card}</Link>
                    )
                })}
            </div>
            {vendor && (
                <>
                    <h3 className="section-title">All menu items</h3>
                    <MenuList items={vendor.menu.filter((item) => item.id !== offers[0]?.item.id)} onAdd={onAdd} />
                </>
            )}
        </>
    )
}
export default DailySpecial
