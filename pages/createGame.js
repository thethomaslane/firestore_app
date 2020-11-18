import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import generatePin from '../utilities/generatePin.js'
import { useRouter } from 'next/router'

// create router that can be used to move the game
// useRouter() only works in a function component
export default function CreateGame(props) {
  let router = useRouter();
  return (
   <div> 
   <comp.Background />
    <comp.Header>
      <comp.Title text="Phrenemies!" />
    </comp.Header>
    <br />
    <comp.SubTitle text="Which of your friends are Phonies?!" />
    <CreateGameForm connection={props.connection} router={router}/>
    </div>
  )
}


class GameCreatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.setUsernameAndPin = this.setUsernameAndPin.bind(this);
  }

  /* When the user clicks on create game the username they entered is saved
  along with the Question Time, Vote Time, and number of questions that are selected
  */
  setUsernameAndPin() {
    let username = document.getElementById("Username").value;
    let questionTime = document.getElementById("QuestionTime").value;
    let voteTime = document.getElementById("VoteTime").value;
    let numberOfQuestions = document.getElementById("NumberOfQuestions").value;

    // usernames can only contain letters and must include at least one character 
    // NOTE: the input is limited to 12 characters
    if (username.match(/^[a-zA-Z]+$/) && username.length >=1) {
      // 8 Letter pin is generated
      let pin = generatePin();

      // Set cookies so that users can refresh and rejoin the game
      setCookie("username", username);
      setCookie("pin", pin);
      setCookie("start", "false");
      setCookie("spectator", "false");

      // open the connection
      this.props.connection.send(JSON.stringify({Code: "Open"}));
      // send the metrics to the server to create the game
      this.props.connection.send(JSON.stringify({Code: "Create Game", Game: {Pin: pin, QuestionTime: questionTime, VoteTime: voteTime, NumberOfQuestions: numberOfQuestions},
        Player: {Pin: pin, Name: username, Host: true}}));
      // move the user to the play page
      this.props.router.push("/play");
    }
    else {alert("Username can only contain letters and be between 1 and 12 characters in length.")}
  }
  render() {
    return (
      <div className={multiClass([styles.paddedTopBottom, styles.centered])} >
        <comp.PrimaryButton id="GameCreatorButton" text="Create" clickFunction={this.setUsernameAndPin}  />
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
        <comp.Select Options={[3,5,7,10,15]} Select="NumberOfQuestions" SelectLabel="Set Questions:" Recommended={5} />
        <br />
        <br />
        <comp.Select Options={[15,30,45,60,75,90,120]} Select="QuestionTime" SelectLabel="Set Question Time:" Recommended={30} />
        <br />
        <br />
        <comp.Select Options={[15,30,45,60,75,90,120]} Select="VoteTime" SelectLabel="Set Voting Time:" Recommended={45} />
        <br />
        <GameCreatorButton connection={this.props.connection} router={this.props.router} />
      </comp.MenuBox>
    )
  }
}

// I got this from the W3Schools site. Can only set one cookie at a time
function setCookie(name, value) {
  var d = new Date();
  d.setTime(d.getTime() + (20 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  let newCookie = name+ "=" + value + ";" + expires + ";";
  document.cookie = newCookie;
}