import Layout from '../components/layout';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import parse from 'html-react-parser';
import {motion} from 'framer-motion'


export default function About({heroData, aboutData, bMembers}){
  return(
    <Layout title="Angle City Brigade | About ACB">

      <div className="row">
        <div className="container clearTop about-hero" style={{backgroundImage:`url(${heroData.bkg})`}}>
          <div className="tint"></div>
          <div className="row hero hero-wrap  align-items-center" >
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
      </div>
      <div className="row about-copy-wrap">
        <div className="col-12 about-copy">
          <h3 className="text-center">{aboutData.title}</h3>
          <p>{aboutData.copy}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-12 text-center">
          <h3>The Board</h3>
        </div>
        {bMembers.map((member, key)=>(
          <div key={key} className={(key < 3) ? 'col-6 col-md-4 bmember' : 'col-6 col-md-3 bmember' }>
            <img className="img-fluid img-thumbnail" src={member.img} alt={member.name}/>
            <h3 className="text-center">{member.name}</h3>
            {parse(member.copy)}
          </div>
        ))}
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
      acbAbout(idType: SLUG, id: "angel-city-brigade") {
        acbAboutMeta {
          acbAboutUsCopy
          fieldGroupName
        }
        title
      }
      boardMembers {
        edges {
          node {
            boardMemberMeta {
              boardMemberPhoto {
                sourceUrl
              }
            }
            title
            content
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
    console.log(data.boardMembers.edges)
    let bMembers =[]
    data.boardMembers.edges.map((edge, i)=>{
      let member = {
        name: edge.node.title,
        copy: edge.node.content,
        img: edge.node.boardMemberMeta.boardMemberPhoto.sourceUrl
      }
      return bMembers = [...bMembers, member]
      console.log(member, bMembers)
    });
    let heroData = {
      bkg:'',
      heroTtl:''
    }
    data.heroBackgrounds.edges.map((edges)=>{
      if(edges.node.hbkgMeta.heroPage === "About"){
        heroData.bkg = edges.node.hbkgMeta.heroBackground.sourceUrl;
        heroData.heroTtl= edges.node.hbkgMeta.heroTitle
      }
    })
    let aboutData ={
      title: data.acbAbout.title,
      copy: data.acbAbout.acbAboutMeta.acbAboutUsCopy
    }


    return{
      props:{
        heroData,
        aboutData,
        bMembers
      }
    }
}