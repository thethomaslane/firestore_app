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
      <comp.SubTitle text="Help Phrenemies! by Writing Questions" />
      <NewQuestionButton />
      	<comp.ArticleSection title="What can you do?" text={"   Phrenemies! needs your help. This game needs a lot of questions so there are not too many repeated questions."
      	+"\n   You can follow the link at the top of this page to get to the question submission page. These questions will then be reviewed and added to the game."
      	+" Then if you keep playing, you may see your question in a future game!"} />
      	<comp.ArticleSection title="How?" text={"   Once you follow the link to the question page, it's easy to submit questions."
      	+ "\n   Phrenemies! uses groups of questions that produce similar answers so that the Phony has a chance. What this means is that you"
      	+ " need to submit four questions that produce similar answers. Take inspiration from the existing questions." 
      	+ "\n   For example, one question could be 'How many cups of coffee did you drink today?'. For most people, this will give a number between 0-5."
      	+ " So, the other questions should also have an answer that is a number 0-5. Like, 'How many pairs of dress shoes do you own?', 'How many haircuts do you get a year?',"
      	+ " and 'How many miles do you walk a day?'"
      	+ "\n   Then submit the questions and it will be reviewed and possibly added into the game for yourself and others to enjoy!"} />
      	<div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        	<Link href="/blog"><a><comp.PrimaryButton id="BlogHomeButton" text="Back"/></a></Link>
      	</div>
    </div>
  )
}


class NewQuestionButton extends React.Component {
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
          <Link href="/newQuestion"><a>
            <p className={multiClass([styles.questionButton])}>Submit Question ▸</p>
          </a></Link>
          </div>
      </div>
    )
  }
}