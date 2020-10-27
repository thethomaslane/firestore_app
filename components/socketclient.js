/*import WebSocket from 'wsss'

const connection = new WebSocket('ws://localhost:8080');


connection.onopen = () => {

  connection.send(JSON.stringify({Code: "Open"}));
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage =  (e) => {

  var data = JSON.parse(e.data);
  if (data.Code == "Players") {Players = data.Players; console.log("Players", Players); checkGameState();
      Players.forEach(function(player){if (player.Name == selfPlayerName) {selfPlayer = player; console.log("Self Player", selfPlayer);}})}
  if (data.Code == "Game") {Game = data.Game; console.log("Game Recieved", Game); checkGameState();}
  if (data.Code == "Game Found") {Game = data.Game; Players = data.Players; joinGame();}
  if (data.Code == "Display Message") {alert(data.Message);}
    

}
export default function sendMessage(code, data) {

  connection.send(JSON.stringify({Code: code, Game: data}));
}
*/