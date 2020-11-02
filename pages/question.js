import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Question(props) {
  let questionText;
  let role;
  if (props.CurrentPlayer.Name == props.Game.Imposter) {
    questionText = props.Game.Questions[props.Game.QuestionsAsked].AltText;
    role = "Phony!"
  } else {
    questionText = props.Game.Questions[props.Game.QuestionsAsked].Text;
    role = "Friend"

  }
  return (
    <div>

   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Question"/>
    <QuestionForm role={role} connection={props.connection} question={questionText} pin={props.Game.Pin} playerName={props.CurrentPlayer.Name} host={props.CurrentPlayer.Host}/>
    </div>
  )
}

 
export async function getServerSideProps() {}

class QuestionForm extends React.Component {
  constructor(props) {
      super(props);
      this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    this.props.connection.send(JSON.stringify({Code: "Start Question", Pin: this.props.pin, Host: this.props.host}));
  }

  componentWillUnmount() {
    this.submitAnswer();
  }

  submitAnswer() {
    let answer = document.getElementById("Answer").value;
    console.log("submitting answer", answer);
    console.log("PlayerName", this.props.playerName);
    this.props.connection.send(JSON.stringify({Code: "Submit Answer", Pin: this.props.pin, Answer: answer, PlayerName: this.props.playerName}));

  }
   render() {
     return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text={this.props.role}/>
        <QuestionText question={this.props.question}/>
        <comp.Input text="Answer" />
      </comp.MenuBox>
     )
   }
 }

class QuestionText extends React.Component {
  render() {
    return (
      <h3 className={multiClass([styles.miniWhiteTextBordered, styles.centered])}>{this.props.question}</h3>
    )
  }
}

/*class AnswerSubmitterButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom])} >
        <comp.PrimaryButton id="AnswerSubmitterButton" text="Submit Answer"  />
      </div>
    )
  }
}*/

