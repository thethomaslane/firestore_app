import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Link from 'next/link'

export default function WaitForPlayers(props) {
  return (
    <div>
   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Waiting For Players..."/>
    <comp.SubTitle text={props.Players.length + "/20"} />
    {props.Players.length < 3 && <p className={multiClass([styles.centered, styles.subTitleComp])}>Game can't start with less than 3 players</p>}
    <comp.ListHolder>
      <UsernameBoxList players={props.Players} />
    </comp.ListHolder>
    <GameStarterButton connection={props.connection} display={props.CurrentPlayer.Host && props.Game.Questions && props.Players.length >= 0} 
      pin={props.Game.Pin} QuestionTime={props.Game.QuestionTime} VoteTime={props.Game.VoteTime}/>
    </div>
  )
}


class UsernameBox extends React.Component {
  constructor(props) {
    super(props);
    this.username = props.username;
  }
  render() {
    if (this.username) {
    return (
      <div className={multiClass([styles.userBox, "user", "gridItem", styles.centered])}>
        <h2 className={multiClass([styles.noMarginTopBottom,styles.whiteTextBordered])}>{this.props.username}</h2>
        <style jsx>{`
        .user {
          background-color: ${this.props.color};
          height: 3rem;
          width: 90%;
        }
      `}</style>
      </div>
    )}
    else {
      return (
      <div className={multiClass([styles.userBox, "user", "gridItem", styles.centered])}>
        <h2 className={multiClass([styles.noMarginTopBottom, styles.blackText])}>Waiting...</h2>
      </div>
    )}
  }
}


class UsernameBoxList extends React.Component {

  componentDidMount() {
    setCookie("start", "true");
  }
  
  render() {
    const listItems = this.props.players.map((player) =>
      <UsernameBox key={player.Name} username={player.Name} color={player.Color}/>
    );
    return (
      <React.Fragment>
      {listItems}
      </React.Fragment>
    )
  }
}
class GameStarterButton extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.props.connection.send(JSON.stringify({Code: "Start Game", Pin: this.props.pin, QuestionTime: this.props.QuestionTime, VoteTime: this.props.VoteTime}));
  }
  render() {
    if (this.props.display) {
      return (
        <div className={multiClass([styles.centered, styles.paddedTopBottom])} >
          <comp.PrimaryButton id="GameStarterButton" text="Start Game" clickFunction={this.startGame}/>
        </div>
      )
    } else {return (null)}

  }
}

function setCookie(name, value) {
  var d = new Date();
  d.setTime(d.getTime() + (20 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  let newCookie = name+ "=" + value + ";" + expires + ";";
  document.cookie = newCookie;
}