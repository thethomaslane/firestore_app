import * as comp from "../components/components.js"
import multiClass from '../utilities/multiClass.js'
import styles from '../styles/Home.module.css'
import  { useEffect } from 'react';

export default function Play(props) {

  useEffect(() => {
    connection = props.connection;
    init();
  });

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
        <a href="/"><comp.PrimaryButton id="HomeButton" text="Back to Main Menu" /></a>
      </div>
    )
  }
}

let connection;
function init() {
  console.log("cookie");
  checkCookie();
}

async function checkCookie() {
  console.log("checkCookie");
  console.log(1);
  setTimeout(keepGoing, 1000);
  function keepGoing() {
    console.log(3);
    var username = getCookie("username");
    var pin = getCookie("pin");
    var started = getCookie("start") == "true";
    if (username != "" && pin != "" && started) {
        console.log("username", username);
        connection.send(JSON.stringify({Code: "Rejoin Game", Pin: pin, Username: username}));
      return true;
    } else {
      console.log("no Username");
      return false;
    }
  }
}

function getCookie(cname) {
  console.log("getCookie");
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  console.log("full cookie", document.cookie, "decoded = ", decodedCookie);
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