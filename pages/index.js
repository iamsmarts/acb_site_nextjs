import React from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ReactPlayer from 'react-player';
import {motion} from 'framer-motion'
import Layout from '../components/layout'
import Link from 'next/link'
import parse from 'html-react-parser';

export default function Home({homeData, recentNews, homeInfo}) {
  return (
    <Layout title="Angel City Brigade | Home" description="Blue White &amp; Gold in my heart and soul">
      <div className="row">
        <div className="container clearTop home" style={{backgroundImage:`url(${homeData.bkg})` }}>
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
                {parse(homeInfo.homeMeta.homeAboutSectionCopy)}
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
            controls={false}
            playsinline={true}
            url={homeInfo.homeMeta.homeVideoUrl}
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

        <div className="container carousel-wrap">
          <div className="row rn-wrap">
            <div className="col-12 rn-break col-md-6 align-items-center justify-content-center"><h3>Recent News</h3></div>
            {recentNews.map((news, key)=>{
              return (
                  <div
                    className={`col-12 col-md-6 rn-block align-items-center justify-content-center ${(key === 2) ? 'alt something' : ''}`}
                    style={{backgroundImage:`url(${news.recentNewsMeta.featuredImage.sourceUrl})`}}
                    key={key}
                  >
                    <div className="tint"></div>
                    <h4>{news.title}</h4>
                    <p><Link href="/recent-news">Read More</Link></p>
                  </div>)
            })}
          </div>

        </div>

        <div className="container">
          <div className="row home-break">
            <div className="col">
              {parse(homeInfo.homeMeta.homeTextBreak)}
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
        homeInfos {
          nodes {
            homeMeta {
              homeTextBreak
              homeVideoUrl
              homeAboutSectionCopy
              homeAboutImage {
                sourceUrl
              }
            }
          }
        }
        recentNewss (first:3) {
          nodes {
            title
            recentNewsMeta {
              copy
              featuredImage {
                sourceUrl
              }
            }
          }
        }
      }
   `
  })
  let recentNews = data.recentNewss.nodes
  let homeInfo = data.homeInfos.nodes[0]
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
      homeData:dataCapture,
      recentNews:recentNews,
      homeInfo:homeInfo
    }
  }
}