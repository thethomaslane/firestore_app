import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import * as comp from "../components/components.js"
import Link from 'next/link'

export default function Starting(props) {
  return (
    <div>
   <comp.Background />
    <comp.Header>
      <comp.LeftTitle text={props.CurrentPlayer.Name} />
      <comp.RightTitle text={"PIN: "+ props.Game.Pin.substring(0,4) + " " + props.Game.Pin.substring(4,8)} />
    </comp.Header>
    <comp.SubTitle text="Starting in:"/>
    <StartingBox />
    <CancelButton connection={props.connection} pin={props.Game.Pin} />
     </div>
  )
}



class StartingBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {time: 5};
	}

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

	tick() {
	    let newTime;
	    let oldTime = this.state.time;
	    if (oldTime > 0) {
	      newTime = oldTime - 1;
	    } else {
	      newTime = 0;
	    }
	    this.setState({
	      time: newTime
	    });
	  }
  render() {
    return (
      <div className={multiClass([styles.winnerBox, styles.centered])}>
      <style jsx>{`
        .starting {
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
      <h1 className={multiClass(["starting"])}>{this.state.time}</h1>
      </div>

    )
  }
}

class CancelButton extends React.Component {
	constructor(props) {
		super(props);
		this.cancel = this.cancel.bind(this);
	}

	cancel() {
		this.props.connection.send(JSON.stringify({Code: "Cancel Start", Pin: this.props.pin}));
	}
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        <comp.PrimaryButton id="HomeButton" text="Cancel Start" clickFunction={this.cancel}/>
      </div>
    )
  }
}