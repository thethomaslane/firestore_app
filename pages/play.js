import * as comp from "../components/components.js"
import multiClass from '../utilities/multiClass.js'
import styles from '../styles/Home.module.css'
import  { useEffect } from 'react';

// waiting page before player gets into game
export default function Play(props) {

  // This prevents an error that happens if user refreshes
  useEffect(() => {
    connection = props.connection;
    init();
  });

  // If the app recieves an error it is dispalayed in the subtitle
  return (
    <div>
     <comp.Background />
      <comp.Header>
        <comp.Title text="Phrenemies!" />
      </comp.Header>
      <br />
      <comp.SubTitle text={props.ErrorMessage || "Trying to join the game..."} />
      <HomeButton />
    </div>
  )
}


class HomeButton extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered, styles.paddedTopBottom, styles.bottom])} >
        <comp.PrimaryButton id="HomeButton" text="Back" back={true}/>
      </div>
    )
  }
}

let connection;

// Gets user back into game if they refresh
function init() {
  checkCookie();
}

// Checks if they have cookies that let them back into the game
async function checkCookie() {
  setTimeout(keepGoing, 1000);
  function keepGoing() {
    var username = getCookie("username");
    var pin = getCookie("pin");
    var started = getCookie("start") == "true";
    var spectator = getCookie("spectator") == "true";
    if (username != "" && pin != "" && started && !spectator) {
      connection.send(JSON.stringify({Code: "Rejoin Game", Pin: pin, Username: username}));
      return true;
    } else if ( pin != "" && spectator) {
      connection.send(JSON.stringify({Code: "Spectate Game", Pin: pin}));
    } else {
      return false;
    }
  }
}

// Helper function, got this from W3schools.com
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}