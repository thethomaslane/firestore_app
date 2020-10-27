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
      <comp.Title text="Best Phriends" />
    </comp.Header>
    <br />
    <comp.SubTitle text="The game where you find which of your friends are phonies!" />
    <CreateGameForm connection={props.connection}/>
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
    let pin = generatePin();
    console.log(pin);
    this.props.connection.send(JSON.stringify({Code: "Open"}));
    console.log("create game");
    this.props.connection.send(JSON.stringify({Code: "Create Game", Game: {Pin: pin}}));
    this.props.connection.send(JSON.stringify({Code: "Create Player", Player: {Pin: pin, Name: username, Host: true}}));
  }
  render() {
    return (
      <div className={multiClass([styles.paddedTopBottom, styles.centered])} >
        <comp.PrimaryButton id="GameCreatorButton" text="Create Game" clickFunction={this.setUsernameAndPin} next="/waiting" />
      </div>
    )
  }
}

class CreateGameForm extends React.Component {
  render() {
    return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text="Create Game" />
        <comp.Input text="Username" />
        <br />
        <GameCreatorButton connection={this.props.connection}/>
      </comp.MenuBox>
    )
  }
}