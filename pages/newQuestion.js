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
        <comp.Input text="Normal Text" />
        <comp.Input text="Imposter Text" />
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
    let NormalText = document.getElementById("Normal Text").value;
    let QuestionText = document.getElementById("Imposter Text").value;
    this.props.connection.send(JSON.stringify({Code: "New Question", Title: NormalText, AltTitle: QuestionText}));
    Router.reload(window.location.pathname);
  }

  render() {
  
    return (
      <div className={multiClass([styles.centered])} >
        <comp.PrimaryButton id="QuestionSubmitterButton" text="Submit Question" clickFunction={this.newQuestion} />
      </div>
    )
  }
}