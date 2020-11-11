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
  let disabled = 1;
  if (props.CurrentPlayer.Name == props.Game.Phony) {
    questionText = props.Game.Questions[props.Game.QuestionsAsked].AltText;
    role = "Phony!"
  } else {
    questionText = props.Game.Questions[props.Game.QuestionsAsked].Text;
    role = "Friend"

  }
    let currentPlayer;
    for (var i = props.Players.length - 1; i >= 0; i--) {
      if (props.Players[i].Name == props.CurrentPlayer.Name) {currentPlayer = props.Players[i]}
    }
  
    try {disabled = (currentPlayer.LastQuestionAnswered == props.Game.QuestionsAsked);} catch { disabled = false}
    if (disabled) {
      console.log("check")
      document.getElementById("Answer").value = currentPlayer.Answer;
    }
  return (
    <div>

   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Question" subtext={(props.CurrentPlayer.Spectator && "Spectators do not see the question") || null}/>
    {!props.CurrentPlayer.Spectator  && <QuestionForm QuestionNumber={props.Game.QuestionsAsked} role={role} connection={props.connection} question={questionText} pin={props.Game.Pin} disabled={disabled} CurrentPlayer={currentPlayer} host={props.CurrentPlayer.Host} />}
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


  componentWillUnmount() {
    this.submitAnswer();
  }


  submitAnswer() {
    let answer = document.getElementById("Answer").value;
    if(!this.props.disabled && answer != "") {
      this.props.connection.send(JSON.stringify({Code: "Submit Answer", Pin: this.props.pin, Answer: answer, PlayerName: this.props.CurrentPlayer.Name, LastQuestionAnswered: this.props.QuestionNumber}));
    }
  }
  
   render() {

     return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text={this.props.role}/>
        {this.props.role == "Phony!" && <p className={multiClass([styles.centered, styles.noMarginTopBottom])}>Try to blend in with the enemy!</p>}
        <QuestionText question={this.props.question}/>
        <comp.Input text="Answer" maxLength="40" disabled={this.props.disabled}/>
        <div className={multiClass([styles.centered])}>
          <comp.PrimaryButton className={multiClass([styles.centered])} id="AnswerSubmitterButton" text="Submit" clickFunction={this.submitAnswer} disabled={this.props.disabled}  />
        </div>
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


