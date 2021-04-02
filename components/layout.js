import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { Children } from 'react'


const Layout = ({children, title, description }) =>(
<div className={`container`}>
  <Head>
    <meta
      name="description"
      content={description}
      key="description"
    />
    <title>
      {title}
    </title>
    <link rel="icon" href="/favicon.ico" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity= "sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossOrigin="anonymous"
    />
    <script
      src="https://kit.fontawesome.com/90ad3ade8e.js" crossOrigin="anonymous">
    </script>
  </Head>
  <Header/>
  {children}
  <Footer/>
</div>
)
export default Layout;