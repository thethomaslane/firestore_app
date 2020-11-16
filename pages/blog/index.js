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
      <comp.SubTitle text="Blog Posts" />
      	<BlogLink link="/blog/betaLaunch" title="Phrenemies! Launches Beta" text={"   Learn more about why this game was created."} />
      	<BlogLink link="/blog/writeQuestions" title="Help Phrenemies! by Writing Questions" text={"   Writing questions for this game is very difficult and time consuming."
      	+" You can help by writing questions and you may see your question in a future game!" }/>
      	<BlogLink link="/blog/thirdPost" title="Currently All Proceeds Going to Charity" text={"   All ad revenue is going to be donated to charity. Read more about where the money is going."} />
      	<div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        	<Link href="/"><a><comp.PrimaryButton id="HomeButton" text="Home"/></a></Link>
      	</div>
    </div>
  )
}


export class BlogLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false}
  }
  componentDidMount() {
    setTimeout(() => {this.setState({loaded: true})},100)
  }
  render() {
    let loadedClass = "prescale";
    if (this.state.loaded) {loadedClass = "scalein"}
    return (
    
      <div className={multiClass([styles.article, loadedClass, styles.bordered])}>
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