import MenuItemCard from './MenuItemCard'

function MenuList({items, onAdd}) {
    //error handling for empty items array
    if(items.length === 0) {
        return <p className="muted">No items available</p>
    }
    //map through the items array and render a MenuItemCard for each item
    return(
        <div className="grid">
            {items.map(item => (
                <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
            ))}
        </div>
    )
}
export default MenuList