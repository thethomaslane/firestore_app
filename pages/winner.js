import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Link from 'next/link'
import { useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useRouter } from 'next/router'


export default function Home(props) {
let router = useRouter();
// Deletes the game when this page is reached
useEffect(() => {
  if (props.CurrentPlayer.Host) {
    setTimeout(() => {props.connection.send(JSON.stringify({Code: "Delete Game", Pin: props.Game.Pin}))}, 2000);
  }
  setTimeout(() => {props.connection.send(JSON.stringify({Code: "Close Connetion"}))}, 2000);
  });
  
  // get list of question IDs so id they play again they don't repeat
  let questionIDs = [];
  for (var i = props.Game.Questions.length - 1; i >= 0; i--) {
    questionIDs.push(props.Game.Questions[i].ID)
  }
  // sort players by score (Highest Score First)
  let players = props.Players.sort(function(a, b) {
    return parseFloat(b.Score) - parseFloat(a.Score);
});
  let winner = players[0]
  return (
    <div>
   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Winner"/>
    <WinnerList players={players} />
    <ReplayButton usedQuestions={questionIDs} router={router} connection={props.connection} pin={props.Game.Pin} playerName={props.CurrentPlayer.Name} game={props.Game} />
    </div>
  )
}

// This is needed, otherwise, build fails
export async function getServerSideProps() {}
 
// Displays Winners
function WinnerList(props) {

  // Get the score of the first player (players sorted by score)
  // That player and any player with the same score will be displayed
  let highScore = props.players[0].Score;
  const listItems = props.players.map(function(player, index) {
      if (player.Score == highScore) {
      return (<WinnerBox key={player.Name} username={player.Name} score={player.Score} color={player.Color} />)
    }
    }
    );
  return listItems;
  }

// Displays a single winner box
class WinnerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false}
  }
  componentDidMount() {
    setTimeout(() => {this.setState({loaded: true})},150)
  }
  render() {
    let loadedClass = "prescale";
    if (this.state.loaded) {loadedClass = "scalein"}
    return (
      <div className={multiClass([styles.winnerBox, styles.centered, loadedClass])}>
      <style jsx>{`
        .username {
          font-family: Bubblegum Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 72px;
          
          color: black;
          -webkit-text-fill-color: ${this.props.color}; /* Will override color (regardless of order) */
          -webkit-text-stroke-width: 1.5px;
          -webkit-text-stroke-color: black;

          margin-top: 1.5rem;
          margin-bottom: 0;
        }
      `}</style>
      <h1 className={multiClass(["username"])}>{this.props.username}</h1>
      <h2 className={multiClass([styles.blackText, styles.noMarginTopBottom])}>Score: {this.props.score}</h2>
      </div>

    )
  }
}

class ReplayButton extends React.Component {
  constructor(props) {
    super(props);
    this.replay = this.replay.bind(this);
    this.state = {display: false}
  }

  componentDidMount() {
    setTimeout(() => {this.setState({display:true})}, 2000)
  }

  replay() {
    let newpin = newPinGenerator(this.props.pin);
    setCookie("pin", newpin);
    this.props.connection.send(JSON.stringify({Code: "Replay Game", Pin: newpin, Player: this.props.playerName, Game: this.props.game, UsedQuestions: this.props.usedQuestions}))
    this.props.router.push("/play");
  }

  render() {
    if (this.state.display) {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        <comp.PrimaryButton id="HomeButton" text="Play Again" clickFunction={this.replay} />
      </div>
    )
  } else {
    return null
  }
  }
}

function newPinGenerator(Pin) {
  let firstCharacter = parseInt(Pin[0]);
  let newpin;
  let digits = 1;

  if (firstCharacter) {
    firstCharacter = firstCharacter + 1;
    if (firstCharacter >= 10) {digits = 2}
    newpin = firstCharacter + Pin.slice(digits);
  } else {
    newpin = 2 + Pin.slice(1)
  }
  return newpin
}

// I got this from the W3Schools site. Can only set one cookie at a time
function setCookie(name, value) {
  var d = new Date();
  d.setTime(d.getTime() + (20 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  let newCookie = name+ "=" + value + ";" + expires + ";";
  document.cookie = newCookie;
}