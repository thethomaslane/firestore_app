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
      <comp.SubTitle text="The game where you find which of your friends are phonies!" />
      <MainMenuForm />
    </div>
  )
}

 

class MainMenuForm extends React.Component {
  render() {
    return (
      <comp.MenuBox color="#344DA8">
        <CreateGameButton/>
        <JoinGameButton />
      </comp.MenuBox>
    )
  }
}



class CreateGameButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom])}>
      <h2 className={multiClass([styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}>Create Game</h2>
      <Link href="/createGame"><a><comp.PrimaryButton id="CreateGameButton" text="CREATE"> </comp.PrimaryButton></a></Link>
      </div>
    )
  }
}

class JoinGameButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom])}>
      <h2 className={multiClass([styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}>Join Game</h2>
      <Link href="/joinGame"><a><comp.PrimaryButton  id="JoinGameButton" text="JOIN"> </comp.PrimaryButton></a></Link>
      </div>
    )
  }
}
