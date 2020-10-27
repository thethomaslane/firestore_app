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
      <comp.LeftTitle text={props.username} />
      <comp.RightTitle text={"PIN: "+ props.pin.substring(0,4) + " " + props.pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Score"/>
    <comp.ListHolder next="/winner">
    	<UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
      <UserScoreBox place="1st." score="500" username="Username" color="#BB6BD9"/>
    </comp.ListHolder>
    <VotePassButton />
  </div>
  )
}


class UserScoreBox extends React.Component {

  render() {
    return (
      <div className={multiClass([styles.userBox, "user", "gridItem", styles.centered])}>
      <style jsx>{`
        .user {
          background-color: ${this.props.color};
          align-items: center;
          display: inline;
          height: 3.5rem;
          width: 90%;
        }
        .left {
          display: inline;
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



class VotePassButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom])} >
        <Link href="/winner"><a><comp.PrimaryButton id="VoteSubmitterButton" text="Submit Vote" /></a></Link>
      </div>
    )
  }
}