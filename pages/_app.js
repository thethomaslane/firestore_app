import '../styles/globals.css'
import React from 'react';
import App from 'next/app';
import { withRouter } from 'next/router'
import ReactDOM from 'react-dom';
import scoreboard from "./scoreboard.js"
import createGame from "./createGame.js"
import joinGame from "./joinGame.js"
import question from "./question.js"
import waiting from "./waiting.js"
import vote from "./vote.js"
import winner from "./winner.js"
import phony from "./phony.js"



class MyApp extends App {

	constructor(props) {
    	super(props);
    	this.state = {Game: GameState, Players: GamePlayers, CurrentPlayer: CurrentPlayer, PreviousState: "waiting", ErrorMessage: null};
    	this.setUsernameAndPin = this.setUsernameAndPin.bind(this);
        this.resetState = this.resetState.bind(this);
        

	}

	async setUsernameAndPin(username, pin) {
		connection.sendMessage("Create Game", this.state);
	}

    resetState() {
        GamePlayers = GamePlayers.sort(function(a, b) {
            parseFloat(a.Score) - parseFloat(b.Score);
        });
        this.setState({Game: GameState, Players: GamePlayers, CurrentPlayer: CurrentPlayer, PreviousState: GameState.GameState, ErrorMessage: GameState.ErrorMessage});
    }

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
    	let { Component, pageProps } = this.props;
        if (this.state.Game.GameState != "setup") {
            Component = ComponentMap[GameState.GameState];
        }

    	return (
    		<Component {...pageProps} CurrentPlayer={this.state.CurrentPlayer} Game={this.state.Game} Players={this.state.Players} connection={connection} ErrorMessage={this.state.ErrorMessage}></Component>
    		);
  }
}


export default MyApp;



let comp;

const ComponentMap = {"scoreboard": scoreboard, "createGame": createGame, "joinGame": joinGame, "question": question, "waiting": waiting, "vote": vote, "winner": winner, "phony": phony};

import { w3cwebsocket as W3CWebSocket } from "websocket";

const socketServer = process.env.SocketServer || 'ws://localhost:8080';
const connection = new W3CWebSocket(socketServer);


let GameState = {Pin: "", GameState: "setup", ErrorMessage: null, newQuestion: {AltTitle: "waiting", Title: "waiting"} };
let GamePlayers = [];
let CurrentPlayer = {Host: false};

connection.onopen = () => {

  connection.send(JSON.stringify({Code: "Open"}));
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage =  (e) => {

  var data = JSON.parse(e.data);
  if (data.Code == "Open") {console.log("Open Connection");}
  if (data.Code == "Players") {GamePlayers = data.Players;comp.dispatchEvent(new Event('recievePlayers'));}
  if (data.Code == "Game") {GameState = data.Game; console.log("State of Game",GameState.GameState);comp.dispatchEvent(new Event('recieveGame'));}
  if (data.Code == "Submit Answer") {console.log("submitAnswer dispatched"), document.dispatchEvent(new Event("submitAnswer"));}
  if (data.Code == "Submit Vote") {console.log("submitVote dispatched"), document.dispatchEvent(new Event("submitVote"));}
  if (data.Code == "Current Player") {CurrentPlayer = data.Player; console.log("CurrentPlayer", CurrentPlayer); comp.dispatchEvent(new Event('recievePlayers'));}
  if (data.Code == "Game Found") {Game = data.Game; Players = data.Players; joinGame();}
  if (data.Code == "Display Message") {alert(data.Message);}
  if (data.Code == "Join Failed") {GameState.ErrorMessage = data.Message; console.log(data.Message); comp.dispatchEvent(new Event('recieveGame'));}
  if (data.Code == "New Question") {if (data.newQuestion) {GameState.newQuestion = data.newQuestion; comp.dispatchEvent(new Event('recieveGame'));}}
}

function sendMessage(code, data) {

  connection.send(JSON.stringify({Code: code, Game: data}));
}
