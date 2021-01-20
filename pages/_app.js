import '../styles/globals.css'
import React from 'react';
import App from 'next/app';
import { withRouter } from 'next/router'
import * as components from "../components/components.js"
import ReactDOM from 'react-dom';
import scoreboard from "./scoreboard.js"
import createGame from "./createGame.js"
import joinGame from "./joinGame.js"
import question from "./question.js"
import waiting from "./waiting.js"
import vote from "./vote.js"
import winner from "./winner.js"
import phony from "./phony.js"
import starting from "./starting.js"
import role from "./role.js"
import prevote from "./prevote.js"


class MyApp extends App {

  // Initializes state to prevent errors if data is not recieved
	constructor(props) {
    	super(props);
    	this.state = {Game: GameState, Players: GamePlayers, CurrentPlayer: CurrentPlayer, PreviousState: "waiting", ErrorMessage: null};
      this.resetState = this.resetState.bind(this);   
	}

  // Sets state based on state from server
  resetState() {
    this.setState({Game: GameState, Players: GamePlayers, CurrentPlayer: CurrentPlayer, PreviousState: GameState.GameState, ErrorMessage: GameState.ErrorMessage});
  }

  // Attaches Listeners so that the app will reset state when an update is receieved
  componentDidMount() {
        comp = ReactDOM.findDOMNode(this);
        comp.addEventListener("recieveGame", this.handleRecieveGame);
        comp.addEventListener("recievePlayers", this.handleRecievePlayers);

  }

  handleRecieveGame = (event) => {
    this.resetState();
  }

  handleRecievePlayers = (event) => {
    this.resetState();
  }

	render() {
      let title;
      // Change component in Game Loop without loosing state
    	let { Component, pageProps } = this.props;
        if (this.state.Game.GameState != "setup") {
            // Component is selected from ComponentMap based on GameState
            Component = ComponentMap[GameState.GameState];
            title = "- " + GameState.GameState;
        }
        if (GameState.GameState == "setup") {
          title = ""
        }

      // Adds props that can be accessed by all components
      // connection is the websocket connection that is used to communicate with the server
    	return (
        <React.Fragment>
          <components.PhrenemiesHeader title={title}/>
      		<Component {...pageProps} CurrentPlayer={this.state.CurrentPlayer} Game={this.state.Game} Players={this.state.Players} connection={connection} ErrorMessage={this.state.ErrorMessage}></Component>
    		</React.Fragment>
        );
  }
}


export default MyApp;



let comp;

// Used to pick component based on state
const ComponentMap = {"scoreboard": scoreboard, "starting": starting, "createGame": createGame, "joinGame": joinGame, "role": role, "question": question, "prevote": prevote, "waiting": waiting, "vote": vote, "winner": winner, "phony": phony};

// Sets up socket connection using environment variable
import { w3cwebsocket as W3CWebSocket } from "websocket";
const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER;
const connection = new W3CWebSocket(socketServer);

// Initialize state to prevent errors
let GameState = {Pin: "", GameState: "setup", ErrorMessage: null, newQuestion: {Questions: ["waiting", "waiting", "waiting", "waiting"]} };
let GamePlayers = [];
let CurrentPlayer = {Host: false};


// Open Connection
connection.onopen = () => {

  connection.send(JSON.stringify({Code: "Open"}));
}

// Log error
//TODO: add an event that casues an alert to pop up
connection.onerror = (error) => {
  console.log("You have lost connection to the server, try refreshing.");
}

// Handle messages recieved
// In general, update state and dispatch event to reset App State
connection.onmessage =  (e) => {

  var data = JSON.parse(e.data);
  if (data.Code == "Open") {}
  if (data.Code == "Players") {GamePlayers = data.Players;comp.dispatchEvent(new Event('recievePlayers'));}
  if (data.Code == "Game") {GameState = data.Game; comp.dispatchEvent(new Event('recieveGame'));}
  if (data.Code == "Submit Answer") {document.dispatchEvent(new Event("submitAnswer"));}
  if (data.Code == "Submit Vote") {document.dispatchEvent(new Event("submitVote"));}
  if (data.Code == "Current Player") {CurrentPlayer = data.Player; comp.dispatchEvent(new Event('recievePlayers'));}
  if (data.Code == "Game Found") {Game = data.Game; Players = data.Players; joinGame();}
  if (data.Code == "Display Message") {alert(data.Message);}
  if (data.Code == "Join Failed") {GameState.ErrorMessage = data.Message; comp.dispatchEvent(new Event('recieveGame'));}
  if (data.Code == "New Question") {if (data.newQuestion) {GameState.newQuestion = data.newQuestion; comp.dispatchEvent(new Event('recieveGame'));}}
}


