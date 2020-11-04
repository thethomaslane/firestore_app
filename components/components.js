import Head from 'next/head'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import { useRouter } from 'next/router'



export class Background extends React.Component {
  render() {
    return (
    <div className={multiClass([styles.background])}> 
      <div className={multiClass(["overlay"])}>{this.props.children}
      <style jsx>{`
        .overlay {
          background-color: ${this.props.overlay};
          min-height: 100vh;
          min-width: 100vw;
        }
      `}</style>
      </div>
    </div>
    )
  }
}



export class Title extends React.Component {
  render() {
    return (
      <h1 className={multiClass([styles.titleComp, styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}> {this.props.text} </h1>
    )
  }
}



export class SubTitle extends React.Component {
  render() {
    return (
      <h2 className={multiClass([styles.blackText, styles.centered, styles.subTitleComp, styles.noMarginTopBottom])}> {this.props.text} </h2>
    )
  }
}


export class Header extends React.Component {  
  render() {
    return (
      <div className={styles.header}>
      {this.props.children}
      </div>

    )
  }
}



export class MenuBox extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.menuBox, "box"])}> {this.props.children}
        <style jsx>{`
          .box {
            background-color: ${this.props.color};
          }
        `}
        </style>
      </div>
    )
  }
}



export function PrimaryButton(props) {
    const router = useRouter();
    const handleClick = (e) => {
      if (props.clickFunction){
        props.clickFunction();
      }
      if (props.next){
        router.push(props.next);
      }
      

    }
    return (
      <button id={props.id} className={multiClass([styles.primaryButton])} onClick={handleClick}>{props.text}</button>
    )
}



export class Input extends React.Component {
  render() {
    console.log("maxlength", this.props.maxLength);
    return (
      <div className={multiClass([styles.paddedTopBottom])}>
        <p className={multiClass([styles.miniWhiteTextBordered, styles.noMarginTopBottom])}>{this.props.text + ":"}</p>
        <div className={multiClass([styles.centered])}>
          <input id={this.props.text} className={multiClass([styles.inputSize])} required placeholder={"Enter " + this.props.text} type="text" maxLength={this.props.maxLength} />
        </div>
      </div>
    )
  }
}



export class MenuTitle extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered])}>
        <h2 className={multiClass([styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}>{this.props.text}</h2>
      </div>
    )
  }
}



export class LeftTitle extends React.Component {
  render() {
    return (
      <h2 className={multiClass([styles.whiteTextBordered,styles.noMarginTopBottom, styles.textLeft])}> {this.props.text} </h2>
    )
  }
}

export class RightTitle extends React.Component {
  render() {
    return (
      <h2 className={multiClass([styles.whiteTextBordered,styles.noMarginTopBottom, styles.textRight])}> {this.props.text} </h2>
    )
  }
}



export class ListHolder extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered])}>
        <div className={multiClass(["gridContainer", styles.listHolder, styles.centered])} >
          {this.props.children}
        </div>
      </div>
    )
  }
}


export class Timer extends React.Component {
    constructor(props) {
    super(props);
    this.state = {TimeLeft: parseInt(props.TotalTime)};
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
    let oldTime = this.state.TimeLeft;
    if (oldTime > 0) {
      newTime = oldTime - 1;
    } else {
      newTime = 0;
    }
    this.setState({
      TimeLeft: newTime
    });
  }

  render() {
    return (
      <div className={multiClass(["timer", styles.centered])}>
      <p >Time Left: {this.state.TimeLeft}</p>
      <style jsx>{`
        .timer {
          position: absolute;
          top: 0.5rem;
          position: absolute;
          left: 1rem;
          text-align: center;
          font-size: 2rem;
        }
      `}</style>
      </div>

    )
  }
}
