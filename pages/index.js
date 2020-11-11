import * as comp from "../components/components.js"
import multiClass from '../utilities/multiClass.js'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
     <comp.Background />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text="Which of your friends are Phonies?!" />
      <MainMenuForm />
      <InfoHolder />
    </div>
  )
}

 

class MainMenuForm extends React.Component {
  render() {
    return (
      <comp.MenuBox color="#344DA8">
        <comp.MenuTitle text="Main Menu" />
        <CreateGameButton/>
        <JoinGameButton />
      </comp.MenuBox>
    )
  }
}

class InfoHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayAbout: false, displayHow: false};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) {
    if (name == "About" && !this.state.displayAbout) {this.setState({displayAbout: true, displayHow: false})}
    else if (name == "About" && this.state.displayAbout) {this.setState({displayAbout: false, displayHow: false})}
    else if (name == "How to Play" && !this.state.displayHow) {this.setState({displayAbout: false, displayHow: true})}
    else if (name == "How to Play" && this.state.displayHow) {this.setState({displayAbout: false, displayHow: false})}
  }
  render() {
    return (
      <React.Fragment>
      <About display={this.state.displayAbout} clickFunction={this.handleChange}/>
      <HowToPlay display={this.state.displayHow} clickFunction={this.handleChange}/>
      </React.Fragment>
    )
  }
}

class InfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {loaded: false};
  }

  componentDidMount() {
    setTimeout(() => {this.setState({loaded: true})},300)
  }

  handleClick() {
    this.props.clickFunction(this.props.title);
  }

  render() {
    let loadedClass = "prescale";
    if (this.state.loaded) {loadedClass = "scalein"}
    let arrow = " ▸";
    if (this.props.display) {arrow = " ▾"}
    return (
      <div>
        <br />
        <div onClick={this.handleClick} className={multiClass([styles.underlined, loadedClass, styles.infoHover])}>
          <h2 className={multiClass([styles.blackText, styles.noMarginTopBottom, styles.infoHover])}>{this.props.title + arrow}</h2>
        </div>
        <p className={multiClass([styles.underlined, styles.noMarginTopBottom, !this.props.display && styles.hidden])}>{this.props.text}</p>
      </div>
    )
  }
}


class About extends React.Component {
  render() {
    let text = "   This is a game where you try and guess whch of your friends are lying. \n   Grab some friends and try and find the phony."
    return (
      <InfoBox title="About" text={text} display={this.props.display} clickFunction={this.props.clickFunction}/>
    )
  }
}

class HowToPlay extends React.Component {
  render() {
    let text = "   Every round, a new phony is selected.\n   If you are not the phony, answer the question honsestly. Then, try and figure out who is the phony and vote for them.";
    text = text + "\n   If your are the phony, you have a different question from everyone else. Answer the question, then try not to get caught in a lie. The real question will show up on the Vote screen"
    return (
      <InfoBox title="How to Play" text={text} display={this.props.display} clickFunction={this.props.clickFunction}/>
    )
  }
}


class CreateGameButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.paddedTopBottom, styles.inline])}>
      <h2 className={multiClass([styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}>Create Game</h2>
      <Link href="/createGame"><a><comp.PrimaryButton id="CreateGameButton" text="CREATE"> </comp.PrimaryButton></a></Link>
      </div>
    )
  }
}

class JoinGameButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom, styles.inline])}>
      <h2 className={multiClass([styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}>Join Game</h2>
      <Link href="/joinGame"><a><comp.PrimaryButton  id="JoinGameButton" text="JOIN"> </comp.PrimaryButton></a></Link>
      </div>
    )
  }
}
