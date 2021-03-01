import { signin, signout, useSession } from 'next-auth/client'
import Link from 'next/link'

/**
 * The approach used in this component shows how to built a sign in and sign out
 * component that works on pages which support both client and server side
 * rendering, and avoids any flash incorrect content on initial page load.
 **/
const Nav = () => {
  const [session] = useSession()

  return (
    <div className="w-100  bg-cyan-900 o-80">
    <nav className="w-100 center mw-1400 ph2 pv1">
      <div className="flex justify-between">
        
          <div className="flex items-center">
            <Link href={`/`}><div className="f3 fw4 link pointer gray-50"> swift css</div></Link>
          </div>

          <div>
            {!session && (
                <div className="flex items-center">
                  <a className="link" href={`/api/auth/signin`} onClick={(e) => { e.preventDefault(), signin() }}>
                    <div className="ph1 pv05 ml1 br-1 white-70 hover-white-100 bg-white-10 hover-bg-white-30 f6 ls-xsm flex items-center">
                      <span className="pr025">Sign in</span>
                      <svg className="w1 h1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </a>
                </div>
            )}
            {session && (
              <div className="flex items-center">
                <div style={{ backgroundImage: `url(${session.user.image})` }} className='h2 w2 br-pill cover' />
                <div className='f7 pl1 white-90 ls-xsm' > Signed in as <br/><strong>{session.user.email}</strong> </div>
                <a className="link" href={`/api/auth/signout`} onClick={(e) => { e.preventDefault(), signout() }}>
                  <div className="ph1 pv05 ml1 br-1 white-70 hover-white-100 bg-white-10 hover-bg-white-30 f6 ls-xsm flex items-center">
                    <span className="pr025">Sign out</span>
                    <svg className="w1 h1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </a>
              </div>
            )}
          </div>

      </div>
    
    </nav>  
    </div>
  )
}

export default Nav
