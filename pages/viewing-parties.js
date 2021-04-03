import Layout from '../components/layout'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {motion} from 'framer-motion'

export default function Vp({heroData}){
  return(
    <Layout title="Angle City Brigade | Viewing Parties">
      <div className="row vp-wrap">
        <div className="container clearTop vp-hero" style={{backgroundImage:`url(${heroData.bkg})`}}>
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
          <div className="row justify-content-center">
            <div className="col-10 col-md-6 text-center">
              <p><strong>Please check back for 2021 Viewing parties and official bar partners throughout Los Angeles county and beyond. Below is a map of 2020 partners.</strong></p>
            </div>
            <div className="col-12">
              <iframe className="vp-map" title="ACB Viewing Party Map" src="https://www.google.com/maps/d/embed?mid=1zjOuFGdO-6GL1QGfcb_0hlPJuu0BAbri" width="640" height="480"></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(){
  const client = new ApolloClient({
    uri: 'http://data.angelcitybrigade.net/graphql/',
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
    `})

    let heroData = {
      bkg:'',
      heroTtl:''
    }
    data.heroBackgrounds.edges.map((edges)=>{
      if(edges.node.hbkgMeta.heroPage === "VP"){
        heroData.bkg = edges.node.hbkgMeta.heroBackground.sourceUrl;
        heroData.heroTtl= edges.node.hbkgMeta.heroTitle
      }
    })

  return{
    props:{
      heroData
    }
  }
}