import * as comp from "../../components/components.js"
import multiClass from '../../utilities/multiClass.js'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
     <comp.Background />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text="Blog Posts" subtext="Click on any of the posts to read the full article."/>
      	<BlogLink link="/blog/betaLaunch" title="Phrenemies! Launches Beta" text={"   Learn more about why this game was created."} />
      	<BlogLink link="/blog/writeQuestions" title="Help Phrenemies! by Writing Questions" text={"   Writing questions for this game is very difficult and time consuming."
      	+" You can help by writing questions and you may see your question in a future game!" }/>
      	<BlogLink link="/blog/charityDonations" title="Currently All Proceeds Going to Charity" text={"   All revenue that is raised during beta is going to be donated to charity, specifically to Santa Barbara County Food Bank to help provide meals for those in need this Holiday Season. Read more about where the money is going."} />
      	<div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        	<Link href="/"><a><comp.PrimaryButton id="HomeButton" text="Home"/></a></Link>
      	</div>
    </div>
  )
}


class BlogLink extends React.Component {

  render() {
    return (
    
      <div className={multiClass([styles.article, styles.bordered])}>
      	<Link href={this.props.link}><a>
      		<div className={multiClass([styles.inlineBlog])}>
		        <h3 className={multiClass([styles.blackText ])}>{this.props.title}</h3>
		        <p className={multiClass([styles.articleText])}>{this.props.text}</p>
        	</div>
        </a></Link>
      </div>

    )
  }
}