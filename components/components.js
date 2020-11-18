import Head from 'next/head'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import { useRouter } from 'next/router'


// Displays the Paper backgrond, Can have an overlay that improves contrast for text directly on background
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


// Shows Title in Top Middle of Header ("Phrenemies!")
export class Title extends React.Component {
  render() {
    return (
      <h1 className={multiClass([styles.titleComp, styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}> {this.props.text} </h1>
    )
  }
}


// Shows SubTitle and Subtext below Header (Subtitle: "Vote", Subtext: "Question: Who are you?")
export class SubTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false}
  }
  componentDidMount() {
    setTimeout(() => {this.setState({loaded: true})},1)
  }
  render() {
    let loadedClass = "prescale";
    if (this.state.loaded) {loadedClass = "scalein"}
    return (
      <div className={multiClass([loadedClass])} >
        <h2 className={multiClass([styles.blackText, styles.centered, styles.subTitleComp, styles.noMarginTopBottom, loadedClass])}> {this.props.text} </h2>
        <p className={multiClass([styles.centered, styles.noMarginTopBottom, styles.subTitleComp, loadedClass])}>{this.props.subtext}</p>
      </div>
    )
  }
}

// Full screen length, sticky header. Holds titles
export class Header extends React.Component {  
  render() {
    return (
      <div className={styles.header}>
      {this.props.children}
      </div>

    )
  }
}


// A blue box that can hold elements
export class MenuBox extends React.Component {
    constructor(props) {
    super(props);
    this.state = {loaded: false}
  }
  componentDidMount() {
    setTimeout(() => {this.setState({loaded: true})},150)
  }
  render() {
    let loadedClass = "prescale";
    if (this.state.loaded) {loadedClass = "scalein"}
    return (
      <div className={multiClass([styles.menuBox, "box", loadedClass])}> {this.props.children}
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

// Component Wrapper for functional component, needed to animate properly
export class PrimaryButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false}
  }
  componentDidMount() {
    setTimeout(() => {this.setState({loaded: true})},300)
  }
  render() {
    let loadedClass = "prescale";
    if (this.state.loaded) {loadedClass = "scalein"}
    return (
      <PrimaryButtonFunction back={this.props.back} loadedClass={loadedClass} clickFunction={this.props.clickFunction} next={this.props.next} id={this.props.id} disabled={this.props.disabled} text={this.props.text}/>
    )
  }
}

// Functional Button Component, needed for useRouter()
function PrimaryButtonFunction(props) {

    const router = useRouter();

    // Button can execute arbitrary function, move to a new page, or go back to previous page
    const handleClick = (e) => {
      if (props.clickFunction){
        props.clickFunction();
      }
      if (props.next){
        router.push(props.next);
      }
      if (props.back) {
        router.back();
      }
      

      // Buton can be disabled by setting a prop
    }
    return (
      <button id={props.id} disabled={props.disabled} className={multiClass([styles.primaryButton, props.loadedClass])} onClick={handleClick}>{props.text}</button>
    )
}


// Allows user to input text. Can be disabled, can have limits on input length
export class Input extends React.Component {

  render() {
    return (
      <div className={multiClass([styles.paddedTopBottom])}>
        <p className={multiClass([styles.miniWhiteTextBordered, styles.noMarginTopBottom])}>{this.props.text + ":"}</p>
        <div className={multiClass([styles.centered])}>
          <input id={this.props.text} disabled={this.props.disabled} className={multiClass([styles.inputSize])} autoComplete="off" placeholder={"Enter " + this.props.text} type="text" maxLength={this.props.maxLength} />
        </div>
      </div>
    )
  }
}


// Crreates a select input, used on Join Game
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

// Creates a checkbox input, used for spectate only on join game
export class Checkbox extends React.Component {
  render() {

    return (
      <React.Fragment>
      <label className={multiClass([styles.miniWhiteTextBordered, styles.selectLabel])} htmlFor={this.props.check}>{this.props.checkLabel}</label>
      <input type="checkbox"  name={this.props.check} id={this.props.check} />
      </React.Fragment>
    )
  }
}



// Titles the Menu Box
export class MenuTitle extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered])}>
        <h2 className={multiClass([styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}>{this.props.text}</h2>
      </div>
    )
  }
}


// Title in left of header, used for Username
export class LeftTitle extends React.Component {
  render() {
    return (
      <h2 className={multiClass([styles.whiteTextBordered,styles.noMarginTopBottom, styles.textLeft])}> {this.props.text} </h2>
    )
  }
}

// title in Right of Header, used for Pin
export class RightTitle extends React.Component {
  render() {
    return (
      <h2 className={multiClass([styles.whiteTextBordered,styles.noMarginTopBottom, styles.textRight])}> {this.props.text} </h2>
    )
  }
}


// Generic List Holder
// TODO: Check if used anywhere
export class ListHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false}
  }
  componentDidMount() {
    setTimeout(() => {this.setState({loaded: true})},100)
  }
  render() {
    let loadedClass = "prescale";
    if (this.state.loaded) {loadedClass = "scalein"}
    return (
      <div className={multiClass([styles.centered])}>
        <div className={multiClass(["gridContainer", styles.listHolder, styles.centered, loadedClass])} >
          {this.props.children}
        </div>
      </div>
    )
  }
}

// Timer used for Question and Vote
export class Timer extends React.Component {
  // Initializes the timer with a total time prop
  constructor(props) {
    super(props);
    this.state = {TimeLeft: props.TotalTime};
  }

  // Starts the timer
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // clears interval
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
      <p className={multiClass([styles.noMarginTopBottom])}>Timer:</p>  <p className={multiClass([styles.noMarginTopBottom])}>{this.state.TimeLeft}</p>
      <style jsx>{`
        .timer {
          position: absolute;
          top: 2rem;
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

// Used for Blog posts and About/ How To Play
export class ArticleSection extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.article])}>
        <h3 className={multiClass([styles.blackText])}>{this.props.title}</h3>
        <p className={multiClass([styles.articleText])}>{this.props.text}</p>
      </div>

    )
  }
}

// Head element on all pages
// dangerouslySetInnerHTML used for Google Analytics
// Might want to move Google Adsense Tag to seperate Component so it can be used more selectively (Not during the game)
export class PhrenemiesHeader extends React.Component {
  render() {
    return (
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G30W780XSK"></script>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', 'G-G30W780XSK');
                  `,
            }}
          ></script>
        <script data-ad-client="ca-pub-5915812167551366" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
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
