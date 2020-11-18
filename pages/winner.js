import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Link from 'next/link'
import { useEffect } from 'react';


export default function Home(props) {

// Deletes the game when this page is reached
useEffect(() => {
  if (props.CurrentPlayer.Host) {
    setTimeout(() => {props.connection.send(JSON.stringify({Code: "Delete Game", Pin: props.Game.Pin}))}, 2000);
  }
  setTimeout(() => {props.connection.send(JSON.stringify({Code: "Close Connection"}))}, 2000);
  });

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
    <HomeButton />
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

class HomeButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        <a href="/"><comp.PrimaryButton id="HomeButton" text="Play Again" /></a>
      </div>
    )
  }
}