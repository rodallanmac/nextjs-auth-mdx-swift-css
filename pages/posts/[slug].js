import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import { mdxToString, stringToMdx} from '../../lib/mdxSerialization'
import Link from "next/link";


export default function Post({ post, allPostsMenu }) {


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuFunction = (e) => {
    e.preventDefault() 
    !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false)
  }

  // THIS ADDS CATEGORIES TO YOUR NAV AND IN ORDER
  const uniqCategories = ["getting started", "typography", "colours", "components", "containers", ];


  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>

        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
          
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
              </Head>

             <div className="relative w-100">
              <div onClick={menuFunction} className="cyan-900 db dn-l w-100 mw-1400 center pa1 ph2 cf bb b-black-10 flex items-center pointer h4 cf">
                  <svg className="h24 mr05 cyan-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                <span>menu</span> 
              </div>

              <div style={{top: '124px'}} onMouseUp={menuFunction}  id="menu" className={ isMenuOpen ? "w-100 fixed z-999 bottom-0 left-0 right-0 min-vh-100 max-vh-100 bg-cyan-900 bt bw1 b-black-05 pa1 cf overflow-hidden overflow-y-scroll pb2 animate fadeInRight" : "dn" }>
 
                    { uniqCategories.map( (cat) =>  
                                           <div key={cat} text={cat}>
                                              <div className="f7 fw5 white-90 ttu pb025 pt1 ls-sm">{cat}</div>
                                              
                                              {allPostsMenu ? allPostsMenu.filter( x => x.category === cat ).map( (x) =>  
                                              <Link  key={x.title} as={`/posts/${x.slug.replace(/\.mdx?$/, '')}`} href={`/posts/[slug]`} >
                                              <a className="link white-80 hover-white-100 fw4">
                                                <div className='f6'>{x.title}</div>
                                              </a>
                                              </Link> 
                                              ) : ''}
                                              
                                           </div>
                                            )
                    }
                   
              </div> 
              </div>             

              <div className="w-100 mw-1400 center pa0 cf flex pa2">

                <div className="w-100 w-25-l br b-black-10 dn db-l">
                  <div className="sticky-1 pr1">
         
                  { uniqCategories.map( (cat) =>  
                                           <div key={cat} text={cat}>
                                              <div className="f7 fw5 black-700 ttu pb025 pt1">{cat}</div>
                                              
                                              {allPostsMenu ? allPostsMenu.filter( x => x.category === cat ).map( (x) =>  
                                              <Link  key={x.title} as={`/posts/${x.slug.replace(/\.mdx?$/, '')}`} href={`/posts/[slug]`} >
                                              <a className="link black-500 fw4">
                                                <div className='f6'>{x.title}</div>
                                              </a>
                                              </Link> 
                                              ) : ''}
                                              
                                           </div>
                                            )
                  }


      
                  </div>
                </div>

                <div className="w-100 w-75-l  pl0 pl2-l">
                  <PostHeader
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    author={post.author}
                  />
                  <div> {stringToMdx(post.content)} </div>
                </div>

              </div>

          </>
        )}

    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await mdxToString(post.content || '') 

  const allPostsMenu = getAllPosts([
    'title',
    'category',
    'slug',
    'date',
  ])

  return {
    props: {
      allPostsMenu,
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
