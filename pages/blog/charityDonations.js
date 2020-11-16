import * as comp from "../../components/components.js"
import multiClass from '../../utilities/multiClass.js'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function betaLaunch() {
  return (
    <div>
     <comp.Background overlay="rgba(256,256,256,.5)" />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text="Phrenemies! Donating to Charity" />
      	<comp.ArticleSection title="Donations" text={"   The Phrenemies! beta is launching just in time for Thanksgiving."
        +" Any and all revenue that is made during the beta will be donated to a local food bank."
        +" No one should be without a meal this holiday season, so Phrenemies! is doing their best to help."} />
      	<comp.ArticleSection title="Santa Barbara County Food Bank" text={"   The Santa Barbara County Food Bank is a local food bank that supports the local community."
      	+"\nSBC Food Bank's Mission Statement is:\n     'A food bank is a non-profit organization working to eliminate hunger by providing food, education and other resources to a network of hunger-relief charities and their communities.'"} />
      	<div>
      		<a className={multiClass([styles.infoHover, styles.centered, styles.blackText])} href="https://foodbanksbc.org/what-we-do/" ><h3>Learn more about SBC Food Bank</h3></a>
      	</div>
      	<div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        	<Link href="/blog"><a><comp.PrimaryButton id="BlogHomeButton" text="Back"/></a></Link>
      	</div>
    </div>
  )
}
