import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Router from 'next/router'

export default function CheckQuestion(props) {
  return (
   <div>
     <comp.Background />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text="The game where you find which of your friends are phonies!" />
      <GameJoinerForm question={props.Game.newQuestion} connection={props.connection} phonyText={props.Game.newQuestion.AltTitle} normalText={props.Game.newQuestion.Title} />
    </div>
  )
}

  

class GameJoinerForm extends React.Component {
	componentDidMount() {
		setTimeout(() => {this.props.connection.send(JSON.stringify({Code: "Get New Question"}))}, 1000);
	}
  render() {
    return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text="Submit a Question" />
        <h2 className={styles.whiteTextBordered}>{"Normal Text: " + this.props.normalText}</h2>
        <h2  className={styles.whiteTextBordered}>{"Phony Text: " + this.props.phonyText}</h2>
        <QuestionApproverButton question={this.props.question} connection={this.props.connection}/>
        <QuestionRejectorButton  question={this.props.question} connection={this.props.connection}/>
      </comp.MenuBox>
    )
  }
}


class QuestionApproverButton extends React.Component {
  constructor(props) {
    super(props);
    this.approveQuestion = this.approveQuestion.bind(this);
  }

  approveQuestion() {
    this.props.connection.send(JSON.stringify({Code: "Approve Question", Question: this.props.question}));
    Router.reload(window.location.pathname);
  }

  render() {
  
    return (
      <div className={multiClass([styles.centered])} >
        <comp.PrimaryButton id="QuestionSubmitterButton" text="Approve" clickFunction={this.approveQuestion} />
      </div>
    )
  }
}

class QuestionRejectorButton extends React.Component {
  constructor(props) {
    super(props);
    this.rejectQuestion = this.rejectQuestion.bind(this);
  }

  rejectQuestion() {
    this.props.connection.send(JSON.stringify({Code: "Reject Question", Question: this.props.question}));
    Router.reload(window.location.pathname);
  }

  render() {
  
    return (
      <div className={multiClass([styles.centered])} >
        <comp.PrimaryButton id="QuestionRejectorButton" text="Reject" clickFunction={this.rejectQuestion} />
      </div>
    )
  }
}