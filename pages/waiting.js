import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Link from 'next/link'

export default function WaitForPlayers(props) {
  return (
    <div>
   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.username} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Waiting For Players"/>
    <comp.ListHolder>
      <UsernameBoxList players={props.Players} />
    </comp.ListHolder>
    <GameStarterButton connection={props.connection} display={props.CurrentPlayer.Host} pin={props.Game.Pin}/>
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
  
  render() {
    console.log("list of players", this.props.players);
    const listItems = this.props.players.map((player) =>
      <UsernameBox key={player.Name} username={player.Name} color="#BB6BD9"/>
    );
    return (
      <div>
      {listItems}
      </div>
    )
  }
}
class GameStarterButton extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.props.connection.send(JSON.stringify({Code: "Start Game", Pin: this.props.Pin}));
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