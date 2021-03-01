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
import uniq from 'lodash/uniq';

export default function Post({ post, allPostsMenu }) {


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuFunction = (e) => {
    e.preventDefault() // Operate the drop down
    !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false)
  }


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

              <div onClick={menuFunction} className="db dn-l w-100 mw-1400 center pa1 ph2 cf bb b-black-10 flex items-center pointer">
                  <svg className="h24 mr05" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                <span>menu</span> 
              </div>

              <div onMouseUp={menuFunction}  id="menu" className={ isMenuOpen ? "w-100 fixed z-999 right-0 min-vh-100 bg-white bt bw1 b-black pa1 cf" : "dn" }>
                    <div className="f7 fw5 black-700 pb1 ttu">Getting Started</div>
                    {allPostsMenu && allPostsMenu.map((post) => (
                                <div key={post.title} className='pb05 pr075 pr2-l'>
                                  <Link as={`/posts/${post.slug.replace(/\.mdx?$/, '')}`} href={`/posts/[slug]`} >
                                    <a className="link black-500 fw4">
                                      <div className='f6'>{post.title}</div>
                                    </a>
                                  </Link>
                                </div>
                      ))}
              </div>              

              <div className="w-100 mw-1400 center pa0 cf flex pa2">

                <div className="w-100 w-25-l br b-black-10 dn db-l">
                  <div className="sticky-1 ">
         
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
