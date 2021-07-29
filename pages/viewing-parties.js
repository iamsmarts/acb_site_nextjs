import Layout from '../components/layout'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {motion} from 'framer-motion';
import parse from 'html-react-parser';

export default function Vp({heroData,vpInfo}){
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
             {parse(vpInfo.vpMetas.vpCopy)}
            </div>
            <div className="col-12">
              <iframe className="vp-map" title="ACB Viewing Party Map" src={vpInfo.vpMetas.vpMapsUrl} width="640" height="480"></iframe>
            </div>
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
      viewingParties {
        nodes {
          vpMetas {
            vpCopy
            vpMapsUrl
          }
        }
      }
    }
    `})
    let vpInfo = data.viewingParties.nodes[0]
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
      heroData,
      vpInfo
    }
  }
}