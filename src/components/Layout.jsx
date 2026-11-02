import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// A layout route: Header and Footer appear on every page, and <Outlet />
// is the hole where the matching child page (Home, Vendor, Cart...) is drawn.
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout

