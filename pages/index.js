
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Link from "next/link";

export default function Index() {

  return (
 
      <Layout>
        <Head>
          <title>Swiftcss with {CMS_NAME}</title>
        </Head>
       
        <div className="ph0 pb3">
              <div className="w-100 center bg-cyan-900 cf">
                <div className="w-100 cover bg-bottom-left " style={{ backgroundImage: 'url(/clouds.svg)' }}>
                    <div className="mw-1400 ph2 center">
                      <div>
                        <div className="f1 fw7 gray-100 lh-075 pt3">Swift <span className="fw3">css</span></div>
                        <div className="f4 ls-xsm gray-100 mw600 fw3 pb1">It's fast, light, responsive and accurate to a pixel </div>
                        <Link href={`/posts/introduction`} >
                          <a className="link ls-xsm br-1 bg-white cyan-900  ph2 pv05 f6 pointer tc center dib hover-bg-white-30 hover-white-100">
                          explore
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-end ">
                    <div className="w-10 w-50-l"></div>
                    <img className="w-90 w-40-l mn-t3 " src="/swift.svg" alt="..." />
                </div>
            </div>
            </div>
          </div>
        
         
 
       
      </Layout>
    
  )
}

