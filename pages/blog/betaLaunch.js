import * as comp from "../../components/components.js"
import multiClass from '../../utilities/multiClass.js'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function betaLaunch() {
  return (
    <div>
     <comp.Background overlay="rgba(256,256,256,.5)" />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text="Phrenemies! Launches Beta" />
      	<comp.ArticleSection title="When?" text={"   The Phrenemies! beta is launching just in time for Thanksgiving."
        +" It’s the perfect game to play with your friends and family. Even better, you can play remotely!"
        +" Hop on a video call with up to 20 people and try and find which of your friends is the Phony."} />
      	<comp.ArticleSection title="Why?" text={"   Phrenemies! was created for people to play a game with large groups of their friends, family, or coworkers."
      	+" Phrenemies! Is free to play and supports groups up to 20 people."
      	+" Play it at your works next happy hour, your next family gathering, or just on a call with friends."} />
      	<comp.ArticleSection title="Found a Bug?" text={"   Since Phrenemies! is in beta, there are likely still some bugs in production."
      	+" If you find a bug, please report it on our discord server (click on the icon below)."
      	+" It will make it so we can fix it as quickly as possible and make the game better for you, the players. "} />
      	<div className={multiClass([styles.discord, styles.centered])} >
      		<a href="https://discord.gg/Kn69mguEck" ><img  src="/Discord-Logo+Wordmark-Black.svg" /></a>
      	</div>
      	<div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        	<Link href="/blog"><a><comp.PrimaryButton id="BlogHomeButton" text="Back"/></a></Link>
      	</div>
    </div>
  )
}
