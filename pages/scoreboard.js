import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"


export default function Scoreboard(props) {

  return (
  <div>
   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Score" subtext={"Question: " + (props.Game.QuestionsAsked+1) + "/" + (props.Game.NumberOfQuestions)}/>
    <comp.ListHolder next="/winner">
    	<ScoreBoxList players={props.Players} />
    </comp.ListHolder>
  </div>
  )
}

// Score box
class UserScoreBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false}
  }

  // delayed based on which place the user is in
  componentDidMount() {
    setTimeout(() => {this.setState({loaded: true})},(150 + (75 * this.props.delay)))
  }
  render() {
    let loadedClass = "prescale";
    if (this.state.loaded) {loadedClass = "scalein"}
    return (
      <div className={multiClass([styles.userBox, "user", "gridItem", styles.centered, loadedClass])}>
      <style jsx>{`
        .user {
          background-color: ${this.props.color};
          align-items: center;
          height: 3.5rem;
          width: 90%;
        }
        .left {
          float: left;
          margin-top: -.5em;
          margin-bottom: 0;
          margin-left: 5px;
        }
        .center {
          display: inline;
          margin-left:-1.5em;
          margin-top: -0.5em;
        }
      `}</style>
        <p className={multiClass([styles.noMarginTopBottom,styles.miniWhiteTextBordered])}>{this.props.username}</p>
        <h3 className={multiClass([styles.noMarginTopBottom, styles.centered, styles.blackText, "center"])}>Score: {this.props.score}</h3>
        <h2 className={multiClass([styles.whiteTextBordered, "left"])}> {this.props.place}</h2>
        
        
      </div>
    )
  }
}



// returns a list of Score Boxes
class ScoreBoxList extends React.Component {
  
  render() {
    let places = ["1st.", "2nd.", "3rd.", "4th.", "5th.", "6th." , "7th.", "8th.", "9th." ,"10th.", "11th.", "12th." ,"13th.", "14th.", "15th." ,"16th.", "17th.", "18th." ,"19th.", "20th."];
    
    // Sorts players based on score
    let players = this.props.players.sort(function(a, b) {
    return parseFloat(b.Score) - parseFloat(a.Score);
});
    const listItems = this.props.players.map((player, index) =>
      <UserScoreBox key={player.Name} username={player.Name} color={player.Color} score={player.Score} place={places[index]} delay={index}/>

    );
    return (
      <React.Fragment>
      {listItems}
      </React.Fragment>
    )
  }
}