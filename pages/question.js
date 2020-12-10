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

  // Checks if the player is the phony, and changes the Menu Title
  if (props.CurrentPlayer.Name == props.Game.Phony) {
    questionText = props.Game.Questions[props.Game.QuestionsAsked].AltText;
    role = "Phony!"
  } else {
    questionText = props.Game.Questions[props.Game.QuestionsAsked].Text;
    role = "Friend"

  }

  // Gets current player and sees if they submitted an answer for this question. If they have, prefills the input and disables
    let currentPlayer;
    for (var i = props.Players.length - 1; i >= 0; i--) {
      if (props.Players[i].Name == props.CurrentPlayer.Name) {currentPlayer = props.Players[i]}
    }
  
    try {disabled = (currentPlayer.LastQuestionAnswered == props.Game.QuestionsAsked);} catch { disabled = false}
    if (disabled) {
      document.getElementById("Answer").value = currentPlayer.Answer;
    }

    // If Current Player is a spectator, don't show the question form
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

// This is needed, otherwise build fails
 export async function getServerSideProps() {}

// Submits the answer when user presses submit or the component unmounts
class QuestionForm extends React.Component {
  constructor(props) {
      super(props);
      this.submitAnswer = this.submitAnswer.bind(this);
  }


  componentWillUnmount() {
    this.submitAnswer();
  }

  // checks if the component is disabled (user already answered)
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
        {this.props.role == "Friend" && <p className={multiClass([styles.centered, styles.noMarginTopBottom])}>You have the same question as your friends, answer truthfully!</p>}
        {this.props.role == "Phony!" && <p className={multiClass([styles.centered, styles.noMarginTopBottom])}>You have a different question from your friends, try to blend in!</p>}
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


