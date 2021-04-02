import Layout from '../components/layout'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import parse from 'html-react-parser';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export default function Faq({heroData, faqs}){
  console.log(faqs)
  return(
    <Layout title="Angel City Brigade | FAQ / Contact Us">
      <div className="row faq-wrap">

        <div
          className="container clearTop faq-hero"
          style={{backgroundImage:`url(${heroData.bkg})`}} >
          <div className="tint"></div>
          <div className="row hero faq-copy-wrap align-items-center">
            <div className="col-12 col-md-10">
            <h2>{heroData.heroTtl}</h2>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row accordion-wrap">
            <Accordion className="col-12">
              <h3 className="text-center">FAQs</h3>
            {faqs.map((faq, key)=>{
              return(
                <AccordionItem key={key}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    {faq.title}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                {parse(faq.copy)}
                </AccordionItemPanel>
                </AccordionItem>
              )
            })}
            </Accordion>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6 d-none d-sm-block">
              <img className="img-fluid" src="http://data.angelcitybrigade.net/wp-content/uploads/2021/04/101200961_1455871071258939_1684034725609648687_n.jpg" alt=""/>
            </div>
            <div className="col-12 col-md-6 contact-us">
              <h3>Contact Us</h3>
              <p>
              <i className="fas fa-map-marker-alt"></i> PMB # 418 <br/>
                335 E Albertoni St <br/>
                Ste 200 <br/>
                Carson, CA 90746 <br/>
                <a href="mailto:info@angelcitybrigade.net">info@angelcitybrigade.net</a>
              </p>
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
      faqs {
        edges {
          node {
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
    let faqs = []
    data.faqs.edges.map((edge)=>{
      let faq = {
        title: edge.node.title,
        copy: edge.node.content
      }
      return faqs = [...faqs, faq]
    })

    let heroData = {
      bkg:'',
      heroTtl:''
    }
    data.heroBackgrounds.edges.map((edges)=>{
      if(edges.node.hbkgMeta.heroPage === "FAQ"){
        heroData.bkg = edges.node.hbkgMeta.heroBackground.sourceUrl;
        heroData.heroTtl= edges.node.hbkgMeta.heroTitle
      }
    })

  return{
    props:{
      heroData,
      faqs
    }
  }
}