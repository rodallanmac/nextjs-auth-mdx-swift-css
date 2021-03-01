
import Nav from './nav'
import Footer from './footer'
import Meta from './meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Nav/>
      <div className="w-100 center cf ">
        <div className="min-vh-100 cf">{children}</div>
        <Footer />
      </div>
    </>
  )
}
