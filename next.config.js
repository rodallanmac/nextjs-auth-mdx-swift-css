module.exports = {
  target: 'serverless',
  env: {
    NEXTAUTH_URL : 'https://nextauth-next.netlify.app',
    NEXTAUTH_GOOGLE_ID: '143976088133-p6ng8thr18t7edl4uinnvh045t5c2o1s.apps.googleusercontent.com',
    NEXTAUTH_GOOGLE_SECRET: 'e22QhxXs1HO5x_r8wnKYmlla'
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    // without this we get
    // ./node_modules/@babel/core/lib/transformation/normalize-file.js:9:0
    // Module not found: Can't resolve 'fs'
    // null
    // as a result of next-mdx-remote
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
