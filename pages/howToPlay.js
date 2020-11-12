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
      <comp.SubTitle text="How to Play" />
    	<comp.ArticleSection title="Creating a Game" text={"   From the Main Menu, press 'Create'. Then enter in your desired username."
      + "\n   Then, set your options. You can change the number of questions, the time players have to answer the questions, and the time players have to vote for the phony."
      + "\n   Finally, press 'Create'. Now all you have to do is give the other players the Pin from the top right-hand corner."} />
      <comp.ArticleSection title="Joining a Game" text={"   Once you get the Pin (8 letters in length) from the Host, you can join the game. From the Main Menu, press 'Join'."
      + "\n   Then, enter in the Pin and your desired username (1-12 letters in length). Finally, press 'Join' and you should be in."
      + "\n   Alternatively, you can enter in your Pin and check the 'Spectate Only' box. This lets you watch the game without playing. Perfect if the game is already full."} />
      <comp.ArticleSection title="Answering the Question" text={"   If you are the Phony this round, the caption at the top of the Question Box will tell you that."
      +"\n   If you are not the Phony, simply answer the question honestly and to the best of your ability. You may not know the correct answer to some questions but give it your best guess."
      +"\n   If you are the Phony, you have a different question from everyone else. Try and answer the question, but be ready to cover for yourself when you see the question on the next screen."} />
      <comp.ArticleSection title="Voting for the Phony" text={"   Now the real question is revealed to everyone, including the Phony, and everyone's answer is revealed (you can't see your own answer)."
      +"\n   If you are the Phony, read the real question then try not to get caught in a lie."
      +"\n   If you are not the Phony, try and find out who is lying and vote for the phony."} />
      <comp.ArticleSection title="Scoring Points" text={"   As the Phony, if you trick someone into voting for someone else, you will score points."
      +"\n   Otherwise, you score points by correctly guessing who the Phony was."} />
      <comp.ArticleSection title="Winning a Game" text={"   As you might have guessed, the winner is the player with the most points at the end of the game"
      +"\n❤︎ But, everyone is a winner if you had fun! ❤︎"} />
      <div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        <Link href="/"><a><comp.PrimaryButton id="HomeButton" text="Home"/></a></Link>
      </div>
      
      
    </div>
  )
}



