import Layout from '../components/layout'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {motion} from 'framer-motion'
import parse from 'html-react-parser';
import moment from 'moment';

export default function RecentNews({heroData, rnPosts}){
  return(
    <Layout title="Recent News">
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
          {rnPosts.map((rn, key)=>{
            return(
              <div className="row" key={key}>
                <div className="col-12 col-md-3 rn-image">
                  <img className="img-fluid" src={rn.recentNewsMeta.featuredImage.sourceUrl} alt=""/>
                </div>
                <div className="col-12 col-md-9">
                  <h3 className="rn-header">{rn.title}</h3>
                  <small className="text-muted rn-date">
                    {moment(rnPosts[0].date).format('MMM Do YYYY')}
                  </small>
                  <br/>
                  <p className="rn-copy">{parse(rn.recentNewsMeta.copy)}</p>
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
      recentNewss {
        nodes {
          recentNewsMeta {
            copy
            featuredImage {
              sourceUrl
            }
          }
          title
          date
        }
      }
    }
    `})

    let heroData = {
      bkg:'',
      heroTtl:''
    }
    data.heroBackgrounds.edges.map((edges)=>{
      if(edges.node.hbkgMeta.heroPage === "Recent News"){
        heroData.bkg = edges.node.hbkgMeta.heroBackground.sourceUrl;
        heroData.heroTtl= edges.node.hbkgMeta.heroTitle
      }
    })

  return{
    props:{
      heroData,
      rnPosts:data.recentNewss.nodes
    }
  }
}