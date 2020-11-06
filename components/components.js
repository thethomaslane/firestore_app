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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    if (this.props.NoSleep) {
      this.props.NoSleep.enable();
    }
  }
  render() {
    return (
      <div className={multiClass([styles.paddedTopBottom])}>
        <p className={multiClass([styles.miniWhiteTextBordered, styles.noMarginTopBottom])}>{this.props.text + ":"}</p>
        <div className={multiClass([styles.centered])}>
          <input id={this.props.text} className={multiClass([styles.inputSize])} autoComplete="off" placeholder={"Enter " + this.props.text} type="text" maxLength={this.props.maxLength} />
        </div>
      </div>
    )
  }
}


export class Select extends React.Component {
  render() {
    const Options = this.props.Options.map(function (option, index) {
    return (<option key={option} value={option} >{option}</option>)
  })

    return (
      <React.Fragment>
      <label className={multiClass([styles.miniWhiteTextBordered, styles.selectLabel])} htmlFor={this.props.Select}>{this.props.SelectLabel}</label>
      <select defaultValue={this.props.Recommended} name={this.props.Select} id={this.props.Select}>
        {Options}
      </select>
      </React.Fragment>
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
    this.state = {TimeLeft: props.TotalTime};
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

export class PhrenemiesHeader extends React.Component {
  render() {
    return (
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Phrenemies!</title>
        <meta property="og:title" content="Phrenemies!" key="title" />
        <meta name="application-name" content="Phrenemies!" />
        <meta name="description" content="The game where you find which of your friends are phonies!" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#344da8" />
        <meta name="apple-mobile-web-app-title" content="Phrenemies" />
        <meta name="application-name" content="Phrenemies" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#344da8" />
      </Head>
    )
  }
}
