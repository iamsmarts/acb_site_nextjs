import React from 'react'
import parse from 'html-react-parser';
import ReactPlayer from 'react-player'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Layout from '../components/layout'


export default function Chants({chantsData}){
  return (
    <Layout title="Angel City Brigade | Chants">
      <div className="row">

        <div className="container clearTop chants-containter" style={{backgroundImage:`url(${chantsData.heroData.bkg})`}}>
          <div className="tint"></div>
          <div className="row hero chant-sheet align-items-center">
            <div className="col-12 col-md-10">
            <h2>{chantsData.heroData.heroTtl}</h2>
            <a href="http://data.angelcitybrigade.net/wp-content/uploads/2021/03/ACB121-Chants-2019.pdf" download className="btn btn-light"><i aria-hidden className="far fa-file-pdf"></i> Download the chant sheet</a>
            </div>
          </div>
        </div>

        <div className="container">
          <div  className="row chant-chants">
            {chantsData.chantsInfo.map((chant, key)=>(
              <div className="col-sm-12 col-md-6 chant" key={key}>
                <div className="chant-wrap">
                  <h3>{chant.title}</h3>
                  {parse(chant.chantMeta.lyrics)}
                  <ReactPlayer
                    className="reactPlayer"
                    url={chant.chantMeta.url}
                  />
                </div>

              </div>
            ))}
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
      chants( first: 500 ) {
        edges {
          node {
            title
            chantMeta {
              url
              lyrics
            }
          }
        }
      }
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
    let chantsInfo = []
    data.chants.edges.map((edges)=>{
      chantsInfo = [...chantsInfo, edges.node]
      return <h1>hello</h1>
    })

    let heroData = {
      bkg:'',
      heroTtl:''
    }
    data.heroBackgrounds.edges.map((edges)=>{
      if(edges.node.hbkgMeta.heroPage === "Chants"){
        heroData.bkg = edges.node.hbkgMeta.heroBackground.sourceUrl;
        heroData.heroTtl= edges.node.hbkgMeta.heroTitle
      }
    })

  return{
    props:{
      chantsData:{
        chantsInfo,
        heroData
      }
    }
  }
}