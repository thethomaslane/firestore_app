import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Question(props) {
  let questionText;
  if (props.CurrentPlayer.Name == props.Game.Imposter) {
    questionText = props.Game.Questions[props.Game.QuestionsAsked].AltText;
  } else {
    questionText = props.Game.Questions[props.Game.QuestionsAsked].Text;
  }
  return (
    <div>

   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.username} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Question"/>
    <QuestionForm question={questionText}/>
    </div>
  )
}

 

class QuestionForm extends React.Component {
   render() {
     return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text="Friend" />
        <QuestionText question={this.props.question}/>
        <comp.Input text="Answer" />
        <AnswerSubmitterButton />
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

class AnswerSubmitterButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom])} >
        <Link href="/vote"><a><comp.PrimaryButton id="AnswerSubmitterButton" text="Submit Answer" /></a></Link>
      </div>
    )
  }
}
