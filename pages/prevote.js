
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"


export default function PreVote(props) {
	let role;
	let text;
	if (props.CurrentPlayer.Name == props.Game.Phony) {
		role = "Phony!";
		text = "You don't need to vote, but try not to get caught in a lie! ";
	} else {
		role = "Friend";
		text = "Someone else a phony and answered a different question. Select who you think it is.";
	}
  return (
    <div>
   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="What time is it?"/>
    <PreVoteDisplay text={text}/>
    </div>
  )
}

 
// Displays a the player's role
class PreVoteDisplay extends React.Component {
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
          -webkit-text-fill-color: white; /* Will override color (regardless of order) */
          -webkit-text-stroke-width: 1.5px;
          -webkit-text-stroke-color: black;

          margin-top: 1.5rem;
          margin-bottom: 0;
        }
      `}</style>
      <h1 className={multiClass(["username"])}>Voting Time</h1>
      <h2 className={multiClass([styles.blackText, styles.noMarginTopBottom])}>{this.props.text}</h2>
      </div>

    )
  }
}
