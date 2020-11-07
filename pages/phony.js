import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Link from 'next/link'

export default function Phony(props) {
  let players = props.Players.sort(function(a, b) {
    return parseFloat(b.Score) - parseFloat(a.Score);
});
  return (
    <div>
   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Phony!"/>
    <PhonyList questionNumber={props.Game.QuestionsAsked} players={players} phony={props.Game.Phony} question={props.Game.Questions[props.Game.QuestionsAsked].AltText}/>
    </div>
  )
}

export async function getServerSideProps() {}
 
function PhonyList(props) {
  let highScore = props.players[0].Score;
  let questionNumber = props.questionNumber;
  const listItems = props.players.map(function(player, index) {
      if (player.LastQuestionAnswered != questionNumber) {player.Answer = "Failed to Answer"}
      if (player.Name == props.phony) {
      return (<PhonyBox key={player.Name} username={player.Name} question={props.question} answer={player.Answer} color={player.Color} />)
    }
    }
    );
  return listItems;
  }

class PhonyBox extends React.Component {
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
      <h2 className={multiClass([styles.blackText, styles.noMarginTopBottom])}>{this.props.question}</h2>
      <p className={multiClass([styles.noMarginTopBottom])}>{this.props.answer}</p>
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