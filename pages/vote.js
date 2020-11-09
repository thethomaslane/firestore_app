import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Vote(props) {
  let subtext = "Vote out the Phony!";
  let disabled = false;
  let selected = "";
  if (props.CurrentPlayer.Name == props.Game.Phony) {
    subtext = "Don't get caught!"
  }

  let currentPlayer;
  for (var i = props.Players.length - 1; i >= 0; i--) {
    if (props.Players[i].Name == props.CurrentPlayer.Name) {currentPlayer = props.Players[i]}
  }

  try {disabled = (currentPlayer.LastScored == props.Game.QuestionsAsked);} catch { disabled = false}
     
    if (disabled) {
      selected = currentPlayer.Vote;
    }

  return (
    <div>
   <comp.Background overlay="rgba(256,256,256,.5)" />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text={subtext}/>
    <p className={multiClass([styles.centered, styles.noMarginTopBottom, styles.subTitleComp])}>{"Question: " + props.Game.Questions[props.Game.QuestionsAsked].Text}</p>
    <VoteListHolder selected={selected} disabled={disabled} userList={props.Players} connection={props.connection} pin={props.Game.Pin} CurrentPlayer={currentPlayer} questionNumber={props.Game.QuestionsAsked} NoSleep={props.NoSleep}/>
    <comp.Timer TotalTime={props.Game.VoteTime} />
    </div>
  )
}
export async function getServerSideProps() {}




class VoteListHolder extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this)
    this.submitVote = this.submitVote.bind(this)
    this.questionNumber = this.props.questionNumber;
    this.checkVote = this.checkVote.bind(this);
    this.state = {selected: this.props.selected}
    setTimeout(() => {this.checkVote()}, 500);
  }

  onSelect(username) {
    if (!this.props.disabled) {
      this.setState({selected: username});
      this.props.NoSleep.enable();
    }
  }

  checkVote() {
    this.setState({selected: this.props.selected});
  }


  componentWillUnmount() {
    this.submitVote();
  }

  submitVote() {
    if (!this.props.disabled && this.state.selected != "") {
      this.props.connection.send(JSON.stringify({Code: "Submit Vote", Pin: this.props.pin, Vote: this.state.selected,
        PlayerName: this.props.CurrentPlayer.Name, QuestionNumber: this.questionNumber}));
    }

  }
  render() {
    let currentPlayer = "";
    try {currentPlayer = this.props.CurrentPlayer.Name;} catch {}
    let selected = this.state.selected;
    let onSelect = this.onSelect;
    let disabled = this.props.disabled;
    let questionNumber = this.props.questionNumber;
    const users = this.props.userList.map(function (user, index) {
    if (user.Name == currentPlayer) {return null}
    else {
    return <AnswerBox enabled={!disabled} disabled={disabled} selected={selected} username={user.Name} key={index} color={user.Color} answer={user.LastQuestionAnswered == questionNumber && user.Answer} clickHandler={onSelect}/>
  }
}
  );
    return (
      <div className={multiClass([styles.centered])}>
        <div className={multiClass(["gridContainer", styles.listHolder, styles.centered])} >
          {users}
        </div>
        <div className={multiClass([styles.centered])}>
          <comp.PrimaryButton className={multiClass([styles.centered])} id="VoteSubmitterButton" text="Submit Vote" clickFunction={this.submitVote} disabled={this.props.disabled}  />
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
      <div onClick={this.handleClick} id={this.props.username} className={multiClass([styles.answerBox, , this.props.disabled && "disabled", "gridItem", this.props.selected==this.props.username && "border"])}>
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

