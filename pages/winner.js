import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Link from 'next/link'

export default function Home(props) {
  return (
    <div>
   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.username} />
      <comp.RightTitle text={"PIN: "+ props.pin.substring(0,4) + " " + props.pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Winner"/>
    <WinnerBox username="Username" score="500" color="#BB6BD9" />
    <HomeButton />
    </div>
  )
}
 

class WinnerBox extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.winnerBox, styles.centered])}>
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

          margin-top: 1.5em;
          margin-bottom: 0;
        }
      `}</style>
      <h1 className={multiClass(["username"])}>{this.props.username}</h1>
      <h2 className={multiClass([styles.blackText, styles.noMarginTopBottom])}>Score: {this.props.score}</h2>
      </div>

    )
  }
}

class HomeButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        <Link href="/"><a><comp.PrimaryButton id="HomeButton" text="Play Again" /></a></Link>
      </div>
    )
  }
}