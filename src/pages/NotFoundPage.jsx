import { Link } from 'react-router'

// Route "*": matches any URL no other route matched.
function NotFoundPage() {
  return (
    <div className="card">
      <h2>404: page not found</h2>
      <p className="muted">That address does not exist.</p>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default NotFoundPage
