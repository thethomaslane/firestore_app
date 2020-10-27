import '../styles/globals.css'
import React from 'react';
import App from 'next/app';
import { withRouter } from 'next/router'
import ReactDOM from 'react-dom';


class MyApp extends App {

	constructor(props) {
    	super(props);
    	this.state = {Game: GameState, Players: GamePlayers, CurrentPlayer: CurrentPlayer, PreviousState: "/waiting"};
    	this.setUsernameAndPin = this.setUsernameAndPin.bind(this);
        this.resetState = this.resetState.bind(this);
        

	}

	async setUsernameAndPin(username, pin) {
		connection.sendMessage("Create Game", this.state);
	}

    resetState() {
        if (GameState.GameState != this.state.PreviousState) {
            this.router.push(GameState.GameState);
        }
        this.setState({Game: GameState, Players: GamePlayers, CurrentPlayer: CurrentPlayer, PreviousState: GameState.GameState});
    }

    componentDidMount() {
        comp = ReactDOM.findDOMNode(this);
        comp.addEventListener("recieveGame", this.handleRecieveGame);
        comp.addEventListener("recievePlayers", this.handleRecievePlayers);
        console.log("event listener added");

    }

    handleRecieveGame = (event) => {
    this.resetState();
  }

  handleRecievePlayers = (event) => {
    this.resetState();
  }

	render() {
    	const { Component, pageProps } = this.props;

    	return (
    		<Component {...pageProps} CurrentPlayer={this.state.CurrentPlayer} Game={this.state.Game} Players={this.state.Players} connection={connection}></Component>
    		);
  }
}


export default MyApp;

let comp;
let router = withRouter();

import { w3cwebsocket as W3CWebSocket } from "websocket";

const connection = new W3CWebSocket('ws://127.0.0.1:8080');


let GameState = {Pin: "", GameState: "/waiting"};
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
  if (data.Code == "Players") {GamePlayers = data.Players; console.log("Players", data.Players);comp.dispatchEvent(new Event('recievePlayers'));}
  if (data.Code == "Game") {GameState = data.Game; console.log("Game Recieved", GameState); comp.dispatchEvent(new Event('recieveGame'));}
  if (data.Code == "Current Player") {CurrentPlayer = data.Player; console.log("CurrentPlayer", CurrentPlayer); comp.dispatchEvent(new Event('recievePlayers'));}
  if (data.Code == "Game Found") {Game = data.Game; Players = data.Players; joinGame();}
  if (data.Code == "Display Message") {alert(data.Message);}
}

function sendMessage(code, data) {

  connection.send(JSON.stringify({Code: code, Game: data}));
}
