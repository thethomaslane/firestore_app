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
      <comp.SubTitle text="About" />
      	<comp.ArticleSection title="Who is this for?" text={"   Play this game with friends, family, or coworkers" 
      	+ " It's easy to understand and quick to play.\n"
      	+ "   When else are you able to yell at your mom and call her a liar?"} />
      	<comp.ArticleSection title="About this Game" text={"   This is a game where you try and guess which of your friends are lying.\n" 
      	+ "   Grab some friends and try and find the phony."} />
      	<div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        	<Link href="/"><a><comp.PrimaryButton id="HomeButton" text="Home"/></a></Link>
      	</div>
    </div>
  )
}
