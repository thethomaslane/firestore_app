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
      <comp.LeftTitle text={props.username} />
      <comp.RightTitle text={"PIN: "+ props.pin.substring(0,4) + " " + props.pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Vote"/>
    <VoteListHolder userList={userList} />
    <VoteSubmitterButton />
    </div>
  )
}

let userList = [];
for (var i = 9; i >= 0; i--) {
userList.push(
{name: "Username" + i.toString(),
color: "#BB6BD9",
answer: "This is my answer, it can go to two diff erent lines." ,
selected: false}
);
} 

class VoteSubmitterButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom])} >
        <Link href="/scoreboard"><a><comp.PrimaryButton id="VoteSubmitterButton" text="Submit Vote" /></a></Link>
      </div>
    )
  }
}


class VoteListHolder extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this)
    this.state = {selected: ""}
  }

  onSelect(username) {
    this.setState({selected: username});
  }
  render() {
    const users = this.props.userList.map((user, index) =>
    <AnswerBox selected={this.state.selected} username={user.name} key={index} color={user.color} answer={user.answer} clickHandler={this.onSelect}/>
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