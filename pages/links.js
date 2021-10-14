import Layout from '../components/layout'
import Link from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {motion} from 'framer-motion'
import parse from 'html-react-parser';
import moment from 'moment';

export default function RecentNews({heroData, bioLinks}){
  return(
    <Layout title="Social Media Bio Links">
      <div className="row recentNews-wrap">
        <div className="container clearTop rn-hero" style={{backgroundImage:`url(${heroData.bkg})`}}>
          <div className="tint"></div>
          <div className="row hero align-items-center vp-copy">
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
                <h2>{heroData.heroTtl}</h2>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="container">
          {bioLinks.map((bl, key)=>{
            return(
              <div className="row" key={key}>
                <div className="col-12">
                <a href={bl.biolinksmeta.linkUrl}>
                  <p className="rn-header"><strong>{bl.biolinksmeta.linkTitle}</strong></p>
                </a>
                </div>
                <hr className="news-break"/>
              </div>
            )
          })}
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
      bioLinks {
        nodes {
          biolinksmeta {
            linkTitle
            linkUrl
          }
        }
      }
    }
    `})

    let heroData = {
      bkg:'',
      heroTtl:''
    }
    data.heroBackgrounds.edges.map((edges)=>{
      if(edges.node.hbkgMeta.heroPage === "Bio Links"){
        heroData.bkg = edges.node.hbkgMeta.heroBackground.sourceUrl;
        heroData.heroTtl= edges.node.hbkgMeta.heroTitle
      }
    })

  return{
    props:{
      heroData,
      bioLinks:data.bioLinks.nodes
    }
  }
}