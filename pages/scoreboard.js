import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import { useRouter } from 'next/router'
import { useEffect } from 'react';


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


class UserScoreBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false}
  }
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




class ScoreBoxList extends React.Component {
  
  render() {
    let places = ["1st.", "2nd.", "3rd.", "4th."];
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