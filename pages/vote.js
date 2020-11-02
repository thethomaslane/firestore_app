import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Vote(props) {


  return (
    <div>
   <comp.Background overlay="rgba(256,256,256,.5)" />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text={props.Game.Questions[props.Game.QuestionsAsked].Text}/>
    <VoteListHolder userList={props.Players} connection={props.connection} pin={props.Game.Pin} playerName={props.CurrentPlayer.Name} questionNumber={props.Game.QuestionsAsked}/>
    </div>
  )
}

export async function getServerSideProps() {}




class VoteListHolder extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this)
    this.state = {selected: ""}
    this.submitVote = this.submitVote.bind(this)
    this.questionNumber = this.props.questionNumber;
  }

  onSelect(username) {
    this.setState({selected: username});
  }

  componentWillUnmount() {
    this.submitVote();
  }

  submitVote() {
    console.log("submitting vote", this.state.selected);
    console.log("questionNumber", this.questionNumber);
    this.props.connection.send(JSON.stringify({Code: "Submit Vote", Pin: this.props.pin, Vote: this.state.selected,
      PlayerName: this.props.playerName, QuestionNumber: this.questionNumber}));

  }
  render() {
    let currentPlayer = this.props.playerName;
    let selected = this.state.selected;
    let onSelect = this.onSelect;
    const users = this.props.userList.map(function (user, index) {
    if (user.Name == currentPlayer) {return null}
    else {
    return <AnswerBox selected={selected} username={user.Name} key={index} color={"#BB6BD9"} answer={user.Answer} clickHandler={onSelect}/>
  }
}
  );
    return (
      <div className={multiClass([styles.centered])}>
        <div className={multiClass(["gridContainer", styles.listHolder, styles.centered])} >
          {users}
        </div>
      </div>
    )
  }
}


class AnswerBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.clickHandler(this.props.username);
  }
  render() {
    return (
      <div onClick={this.handleClick} id={this.props.username} className={multiClass([styles.answerBox, "gridItem", this.props.selected==this.props.username && "border"])}>
      <style jsx>{`
        .username {
          font-family: Bubblegum Sans;
          font-style: normal;
          font-weight: normal;
          
          color: black;
          -webkit-text-fill-color: ${this.props.color}; /* Will override color (regardless of order) */
          -webkit-text-stroke-width: .5px;
          -webkit-text-stroke-color: black;
        }
        .border {
            border: 3px solid #F73D3D;
            box-sizing: border-box;
            border-radius: 10px;
            box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.25);
            transform: translate(-4px, -4px);
            transition-duration: 0.2s;
        }

      `}</style>
      <h3 className={multiClass(["username", styles.noMarginTopBottom])}>{this.props.username}
      </h3>

      <p className={multiClass([styles.noMarginTopBottom, "answer"])}>{this.props.answer}</p>
      </div>
    )
  }
}

