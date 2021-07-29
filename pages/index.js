import React from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ReactPlayer from 'react-player';
import {motion} from 'framer-motion'
import Layout from '../components/layout'

export default function Home({homeData}) {

  return (
    <Layout title="Angel City Brigade | Home" description="Blue White &amp; Gold in my heart and soul">
      <div className="row">
        <div className="container clearTop home" style={{backgroundImage:`url(${homeData.bkg})`}}>
          <div className="tint"></div>
          <div className="row hero align-items-center">
            <div className="col-12 col-md-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                  hidden: {
                    scale: .8,
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .3
                    }
                  },
                }}
              >
                <h1>{homeData.heroTtl}</h1>

              </motion.div>
            </div>
          </div>
        </div>
        <div className="container">

        <div className="row acb-about">
          <div className="col-6 about-bkg d-none d-sm-block">

          </div>
          <div className="col-12 col-md-6 align-items-center about-copy">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 copy-wrap">
                <p>The Angel City Brigade was created to help establish a festive and vibrant atmosphere in the Dignity Health Sports Park. We are here to stand proudly for 90 minutes, sing our hearts out, and have a good time. Join us in the General Admission area inside the Dignity Health Sports Park and in the grass lawn outside the northwest gate before games! Help support the ACB and the Galaxy by chanting along with them during the next home match!</p>
                <a href="/about" className="btn btn-dark"> More About Us</a>
                </div>
              </div>
          </div>
        </div>
        </div>

        <div className="container acb-video">
          <ReactPlayer
            className="home-video"
            width="100%"
            height="100%"
            controls="false"
            playsinline="true"
            url="https://www.youtube.com/watch?v=YuSFHd5FRWU"
            config={{
              youtube:{
                playerVars:{
                  showinfo:0,
                  modestbranding:0,
                }
              }
            }}
          />
        </div>

        <div className="container">
          <div className="row home-break">
            <div className="col">
              <h2 className="home-break">Blue, White, and Gold in my heart and soul, we’re Original Angelenos 💙⚪️💛</h2>
            </div>
          </div>
        </div>

        <div className="container boxes-conainer">
          <div className="row boxes shop-wrap">
            <div className="col-6 home-shop-bkg d-none d-sm-block"></div>
            <div className="col-12 col-md-6 home-shop-copy align-items-center justify-content-center">
              <a href="https://shop.acb.la">
                <h3>Shop</h3>
              </a>
            </div>
          </div>

          <div className="row boxes vp-wrap">
            <div className="col-12 col-md-6 home-vp-copy align-items-center justify-content-center">
              <a href="/viewing-parties">
                <h3>Viewing Parties</h3>
              </a>
            </div>
            <div className="col-6 home-vp-bkg d-none d-sm-block"></div>
          </div>

        </div>

      </div>
    </Layout>
  )
}


export async function getStaticProps(){
  const client = new ApolloClient({
    uri: 'https://b121gade.com/graphql/',
    cache: new InMemoryCache()
  })
  let {data} = await client.query({
    query: gql`
      {
        heroBackgrounds {
          edges {
            node {
              hbkgMeta {
                heroPage
                heroBackground {
                  sourceUrl
                }
                heroTitle
              }
            }
          }
        }
      }
   `
  })

  data = data.heroBackgrounds.edges;
  let dataCapture = {
  }
  let hd = data.map((data)=>{
    if(data.node.hbkgMeta.heroPage === "Home"){
      dataCapture.bkg = data.node.hbkgMeta.heroBackground.sourceUrl;
      dataCapture.heroTtl = data.node.hbkgMeta.heroTitle;
    }
  })
  return{
    props:{
      homeData:dataCapture
    }
  }
}