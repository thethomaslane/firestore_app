import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import { useRouter } from 'next/router'

export default function JoinGame(props) {
  let router = useRouter();
  return (
   <div>
     <comp.Background />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text="Which of your friends are Phonies?!" />
      <GameJoinerForm connection={props.connection} router={router}/>
    </div>
  )
}

  

class GameJoinerForm extends React.Component {
  render() {
    return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text="Join Game" />
        <comp.Input text="PIN" maxLength="8"/>
        <comp.Input text="Username" maxLength="12"/>
        <GameJoinerButton  connection={this.props.connection} router={this.props.router}/>
      </comp.MenuBox>
    )
  }
}


class GameJoinerButton extends React.Component {
  constructor(props) {
    super(props);
    this.setUsernameAndPin = this.setUsernameAndPin.bind(this);
  }
  setUsernameAndPin() {
    let validForm = true;
    let username = document.getElementById("Username").value;
    let pin = document.getElementById("PIN").value.toUpperCase().split(" ").join("");
    if (username.match(/^[a-zA-Z]+$/) && pin.match(/^[a-zA-Z]+$/) && username.length >= 1) {
      setCookie("username", username);
      setCookie("pin", pin);
      setCookie("start", "false");
      this.props.connection.send(JSON.stringify({Code: "Open"}))
      this.props.connection.send(JSON.stringify({Code: "Join Game", Player: {Pin: pin, Name: username, Host: false}}));
      this.props.router.push("/play");
    } else {alert("Username and Pin can only contain letters. \n Username must be between 1 and 12 characters long. \n Pin must be 8 characters long.")}
  }
  render() {
  
    return (
      <div className={multiClass([styles.centered])} >
        <comp.PrimaryButton id="GameJoinerButton" text="Join" clickFunction={this.setUsernameAndPin} />
      </div>
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