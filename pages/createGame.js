import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import generatePin from '../utilities/generatePin.js'

export default function CreateGame(props) {
  return (
   <div> 
   <comp.Background />
    <comp.Header>
      <comp.Title text="Phrenemies!" />
    </comp.Header>
    <br />
    <comp.SubTitle text="The game where you find which of your friends are phonies!" />
    <CreateGameForm connection={props.connection} NoSleep={props.NoSleep}/>
    </div>
  )
}

  

class GameCreatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.setUsernameAndPin = this.setUsernameAndPin.bind(this);
  }
  setUsernameAndPin() {
    let username = document.getElementById("Username").value;
    let questionTime = document.getElementById("QuestionTime").value;
    let voteTime = document.getElementById("VoteTime").value;
    let numberOfQuestions = document.getElementById("NumberOfQuestions").value;
    if (username.match(/^[a-zA-Z]+$/) && username.length >=1) {
      let pin = generatePin();
      setCookie("username", username);
      setCookie("pin", pin);
      setCookie("start", "false");
      this.props.connection.send(JSON.stringify({Code: "Open"}));
      this.props.connection.send(JSON.stringify({Code: "Create Game", Game: {Pin: pin, QuestionTime: questionTime, VoteTime: voteTime, NumberOfQuestions: numberOfQuestions}}));
      setTimeout(() => {this.props.connection.send(JSON.stringify({Code: "Create Player", Player: {Pin: pin, Name: username, Host: true}}));}, 1000);
    }
    else {alert("Username can only contain letters and be between 1 and 12 characters in length.")}
  }
  render() {
    return (
      <div className={multiClass([styles.paddedTopBottom, styles.centered])} >
        <comp.PrimaryButton id="GameCreatorButton" text="Create Game" clickFunction={this.setUsernameAndPin} next="/play" />
      </div>
    )
  }
}

class CreateGameForm extends React.Component {
  render() {
    return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text="Create Game" />
        <comp.Input text="Username" maxLength="12"  />
        <comp.Select Options={[15,30,45,60,75,90,120]} Select="QuestionTime" SelectLabel="Set Question Time:" Recommended={30} />
        <br />
        <br />
        <comp.Select Options={[15,30,45,60,75,90,120]} Select="VoteTime" SelectLabel="Set Voting Time:" Recommended={45} />
        <br />
        <br />
        <comp.Select Options={[3,5,10,15]} Select="NumberOfQuestions" SelectLabel="Set Number of Questions:" Recommended={10} />
        <br />
        <GameCreatorButton connection={this.props.connection} NoSleep={this.props.NoSleep}/>
      </comp.MenuBox>
    )
  }
}

function setCookie(name, value) {
  var d = new Date();
  d.setTime(d.getTime() + (20 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  let newCookie = name+ "=" + value + ";" + expires + ";";
  document.cookie = newCookie;
}