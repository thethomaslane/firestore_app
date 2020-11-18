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
    <PhonyList players={players} phony={props.Game.Phony} questionNumber={props.Game.QuestionsAsked} question={props.Game.Questions[props.Game.QuestionsAsked].AltText}/>
    </div>
  )
}

// This is needed for now, otherwise build fails
export async function getServerSideProps() {}

// Displays list of phonies. Currently game only supports one phony 
function PhonyList(props) {
  let questionNumber = props.questionNumber;

  // creates the phony list
  const listItems = props.players.map(function(player, index) {
      if (player.LastQuestionAnswered != questionNumber) {player.Answer = "Failed to Answer"}
      if (player.Name == props.phony) {
      return (<PhonyBox key={player.Name} username={player.Name} question={props.question} answer={player.LastQuestionAnswered == questionNumber && player.Answer} color={player.Color} />)
    }
    }
    );
  return listItems;
  }

// Displays a single phony
class PhonyBox extends React.Component {
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
      <h2 className={multiClass([styles.blackText, styles.noMarginTopBottom])}>{this.props.question}</h2>
      <p className={multiClass([styles.noMarginTopBottom])}>{this.props.answer}</p>
      </div>

    )
  }
}
