//THIS IS NEW FEATURE I ADD


function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="categorys" role="group" aria-label="Filter by category">
      {/* Put "All" first, then the real categories. */}
      {['All', ...categories].map((cat) => (
        <button
          key={cat}
          type="button"
          className={cat === active ? 'category active' : 'category'} 
          aria-pressed={cat === active}                        
          onClick={() => onChange(cat)}                        
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
