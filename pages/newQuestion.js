import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Router from 'next/router'

export default function newQuestion(props) {
  return (
   <div>
     <comp.Background />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text="The game where you find which of your friends are phonies!" />
      <GameJoinerForm connection={props.connection} />
    </div>
  )
}

  

class GameJoinerForm extends React.Component {
  render() {
    return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text="Submit a Question" />
        <comp.Input text="Question 1" />
        <comp.Input text="Question 2" />
        <comp.Input text="Question 3" />
        <comp.Input text="Question 4" />
        <QuestionSubmitterButton  connection={this.props.connection}/>
      </comp.MenuBox>
    )
  }
}


class QuestionSubmitterButton extends React.Component {
  constructor(props) {
    super(props);
    this.newQuestion = this.newQuestion.bind(this);
  }

  newQuestion() {
    let Q1 = document.getElementById("Question 1").value;
    let Q2 = document.getElementById("Question 2").value;
    let Q3 = document.getElementById("Question 3").value;
    let Q4 = document.getElementById("Question 4").value;
    this.props.connection.send(JSON.stringify({Code: "New Question", Questions : [Q1, Q2, Q3, Q4]}));
    Router.reload(window.location.pathname);
  }

  render() {
  
    return (
      <div className={multiClass([styles.centered])} >
        <comp.PrimaryButton id="QuestionSubmitterButton" text="Submit" clickFunction={this.newQuestion} />
      </div>
    )
  }
}