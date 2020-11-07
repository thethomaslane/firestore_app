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
  if (props.CurrentPlayer.Name == props.Game.Phony) {
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
    <QuestionForm QuestionNumber={props.Game.QuestionsAsked} role={role} connection={props.connection} question={questionText} pin={props.Game.Pin} playerName={props.CurrentPlayer.Name} host={props.CurrentPlayer.Host} NoSleep={props.NoSleep}/>
    <comp.Timer TotalTime={props.Game.QuestionTime} />
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
  }

  componentWillUnmount() {
    this.submitAnswer();
  }

  submitAnswer() {
    let answer = document.getElementById("Answer").value;
    this.props.connection.send(JSON.stringify({Code: "Submit Answer", Pin: this.props.pin, Answer: answer, PlayerName: this.props.playerName, LastQuestionAnswered: this.props.QuestionNumber}));

  }
   render() {
     return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text={this.props.role}/>
        {this.props.role == "Phony!" && <p className={multiClass([styles.centered, styles.noMarginTopBottom])}>Try to blend in with the enemy!</p>}
        <QuestionText question={this.props.question}/>
        <comp.Input text="Answer" maxLength="40" NoSleep={this.props.NoSleep}/>
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

