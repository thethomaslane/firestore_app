import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"

export default function JoinGame(props) {
  return (
   <div>
     <comp.Background />
      <comp.Header>
        <comp.Title text="Best Phriends" />
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
        <comp.MenuTitle text="Join Game" />
        <comp.Input text="PIN" />
        <comp.Input text="Username" />
        <GameJoinerButton  connection={this.props.connection}/>
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
    let username = document.getElementById("Username").value;
    let pin = document.getElementById("PIN").value.toUpperCase();
    console.log("joining game");
    this.props.connection.send(JSON.stringify({Code: "Open"}));
    this.props.connection.send(JSON.stringify({Code: "Create Player", Player: {Pin: pin, Name: username, Host: false}}));
    this.props.connection.send(JSON.stringify({Code: "Join Game", Pin: pin}));
  }
  render() {
  
    return (
      <div className={multiClass([styles.centered])} >
        <comp.PrimaryButton id="GameJoinerButton" text="Join Game" clickFunction={this.setUsernameAndPin} next="/waiting"/>
      </div>
    )
  }
}