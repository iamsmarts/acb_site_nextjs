import Head from 'next/head'
import Header from './header'
import Footer from './footer'

import { Children } from 'react'


const Layout = ({children, title, description, router}) =>(

<div className={`container`}>
  <Head>
    <title>
      {title}
    </title>
    <meta
      name="description"
      content="ACB are LA Galaxy's rowdiest and loudest supporter group. Join us in section 121 and make your voice heard and show support for MLS' biggest club."
      />
    <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
    <link rel="canonical" href="https://angelcitybrigade.net/"/>
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Angel City Brigade - Los Angeles Galaxy Supporters" />
    <meta property="og:description" content="ACB are LA Galaxy's rowdiest and loudest supporter group. Join us in section 121 | 122 and make your voice heard and show support for MLS' biggest club."/>
    <meta property="og:url" content="https://angelcitybrigade.net/" />
    <meta property="og:site_name" content="Angel City Brigade" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:description" content="ACB are LA Galaxy's rowdiest and loudest supporter group. Join us in section 121 | 122 and make your voice heard and show support for MLS' biggest club." />
    <meta name="twitter:title" content="Angel City Brigade - Los Angeles Galaxy Supporters" />
    <meta name="twitter:site" content="@acbrigade" />
    <meta name="twitter:image" content="https://data.angelcitybrigade.net/wp-content/uploads/2021/03/IMG_2416-scaled.jpg" />
    <meta name="twitter:creator" content="@acbrigade" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity= "sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossOrigin="anonymous"
    />
    <script
      src="https://kit.fontawesome.com/90ad3ade8e.js" crossOrigin="anonymous">
    </script>
    <link rel="shortcut icon" href="/favicon_updated.ico" />
  </Head>
  <Header/>
  {children}
  <Footer/>
</div>

)
export default Layout;


