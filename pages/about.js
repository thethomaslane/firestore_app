import * as comp from "../components/components.js"
import multiClass from '../utilities/multiClass.js'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
     <comp.Background overlay="rgba(256,256,256,.5)" />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text="About" />
      	<comp.ArticleSection title="Who is this game for?" text={"   Play this game with friends, family, or coworkers" 
      	+ " It's easy to understand and quick to play.\n"
      	+ "   When else are you able to yell at your mom and call her a liar?"} />
      	<comp.ArticleSection title="About this Game" text={"   This is a game where you try and guess which of your friends are lying.\n" 
      	+ "   Grab some friends and try and find the phony."} />
        <comp.ArticleSection title="Blog" text={"   If you would like to learn more or stay up to date with Phrenemies, checkout our blog."} />
        <BlogButton />
        <br />
      	<div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        	<Link href="/"><a><comp.PrimaryButton id="HomeButton" text="Home"/></a></Link>
      	</div>
    </div>
  )
}


class BlogButton extends React.Component {
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
      <div className={multiClass([styles.article, loadedClass,  styles.centered])}>
          <div className={multiClass([styles.inlineBlog])}>
          <Link href="/blog"><a>
            <p className={multiClass([styles.blogButton])}>Blog ▸</p>
          </a></Link>
          </div>
      </div>
    )
  }
}