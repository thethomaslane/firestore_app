import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Link from 'next/link'
import { useEffect } from 'react';

export default function Home(props) {

useEffect(() => {
  if (props.CurrentPlayer.Host) {
    setTimeout(() => {props.connection.send(JSON.stringify({Code: "Delete Game", Pin: props.Game.Pin}))}, 2000);
  }
  setTimeout(() => {props.connection.send(JSON.stringify({Code: "Close Connection"}))}, 2000);
  });

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

export async function getServerSideProps() {}
 
function WinnerList(props) {
  let highScore = props.players[0].Score;
  const listItems = props.players.map(function(player, index) {
      if (player.Score == highScore) {
      return (<WinnerBox key={player.Name} username={player.Name} score={player.Score} color={player.Color} />)
    }
    }
    );
  return listItems;
  }

class WinnerBox extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.winnerBox, styles.centered])}>
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

          margin-top: 1.5em;
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