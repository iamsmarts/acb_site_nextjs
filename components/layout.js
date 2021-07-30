import Head from 'next/head'
import Header from './header'
import Footer from './footer'

import { Children } from 'react'


const Layout = ({children, title, description, router}) =>(

<div className={`container`}>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

    <title>
      {title}
    </title>

    <base href="https://acb.la"/>
    <meta name="description" content="ACB - LA Galaxy's largest supporter group, stand with us in 121 and 122 support 90 minutes+"/>
    <link rel="canonical" href="https://acb.la"/>

    <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>

    <meta property="og:url" content="https://acb.la" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ANGEL CITY BRIGADE | ACB.LA"/>
    <meta property="og:title" content="Angel City Brigade" />
    <meta property="og:description" content="ACB - LA Galaxy's largest supporter group, stand with us in 121 and 122 support 90 minutes+ " />
    <meta property="og:image" content="/acb-stands-scarves-update.jpg" />
    <meta property="og:image:alt" content="ACB in action, scarves up!" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@acbrigade" />
    <meta name="twitter:creator" content="@acbrigade" />
    <meta property="og:url" content="https://acb.la" />
    <meta property="og:title" content="121 Angel City Brigade 122" />
    <meta property="og:description" content="ACB - LA Galaxy's largest supporter group, stand with us in 121 and 122 support 90 minutes+ " />
    <meta property="og:image" content="/acb-stands-scarves-update.jpg" />


    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity= "sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
    <script src="https://kit.fontawesome.com/90ad3ade8e.js" crossOrigin="anonymous"/>

    <link rel="shortcut icon" href="/favicon_updated.ico" />
  </Head>
  <Header/>
  {children}
  <Footer/>
</div>

)
export default Layout;


