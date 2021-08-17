import Slayout from '../components/slayout';
import parse from 'html-react-parser';
import Image from 'next/image'
export default function Protest(){
  return(
    <Slayout title="SUPPORTING L.A. IS NOT A CRIME">
    <main role="main" className="inner cover statement">
        <Image src="/vblock.png" alt="Victoria Block Logo"width="150" height="117" layout="intrinsic" />
        <p>August 17, 2021</p>
        <p>To the entire LA Galaxy Supporters Community and Fans,</p>
         <p>Dignity Health Sportspark is our home. As one of the country’s first soccer specific stadiums our community has been at the forefront of soccer culture in the US. The post game celebrations in lot 13 is something that has come together organically and has attracted more casual fans to become supporters of the LA Galaxy. </p>
         <p>Sunday August 8th, the front office along with DHSP general management and AEG appointed security leadership directed Los Angeles County Sheriffs officers to use high frequency sirens, threats of violence, and other unwarranted tactics to dismantle organic support for the the club.</p>
         <p>We emphatically oppose any and all attempts to work against our collective love and passion for our team. Furthermore, we condemn the use of force and harassment of street vendors who we welcome. </p>
         <p>Any attempts to suppress this organic support for the LA Galaxy is strongly opposed by the Angel City Brigade. The LA Galaxy, our stadium, and our support is a staple in Major League Soccer. The way we support our club is part of the evolution of soccer culture across North America. Its time the front office values our collective contributions. </p>
         <p><strong> - Angel City Brigade, Galaxians 96, Galaxy Outlawz </strong></p>
      </main>

      </Slayout>
  )
}


