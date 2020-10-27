const Server = require('socket.io');

const WebSocket = require('ws');
 
var wss = new WebSocket.Server({ port: 8080, host: "localhost" });
var pinString;
console.log(1,"Socket Server Starting");
wss.on('connection', function connection(ws) {
  socket = ws;
  ws.on('message', function incoming(message) {
    var data = JSON.parse(message);
    if (data.Code == "Open") {console.log(2,"Connection Opened"); socket.send(JSON.stringify({Code: "Open"}))}
    if (data.Code == "Pin") {pinString = data.Pin;}
    if (data.Code == "Create Game") {pinString = data.Game.Pin; createGame(data.Game, socket); }
    if (data.Code == "Create Player") {createPlayer(data.Player, socket);}
    if (data.Code == "Join Game") {console.log("joining game",data.Pin); startGameListener(data.Pin, socket), startPlayersListener(data.Pin, socket);}
    if (data.Code == "Get Players") {socket.send(JSON.stringify({Code: "Players", Players: Players}));}
    if (data.Code == "Find Game") {findGame(ws);}
    if (data.Code == "Players Listener") {startPlayersListener(wss);}
    if (data.Code == "Game Listener") {startGameListener(wss);}
    if (data.Code == "Next Game State") {nextGameState();}
    if (data.Code == "Update Player") {db.collection("Games").doc(pinString).collection("Players").doc(data.Player).update(data.playerUpdate)};
    if (data.Code == "Close Connection") {ws.terminate();}
    if (data.Code == "Start Game") {};
    
  });
  
});

const admin = require('firebase-admin');



  db = admin.firestore();

async function createGame(gameData, socket) {
  console.log(3,"Game Creating");
  pinString = gameData.Pin;
  gameValues = {
    Pin: pinString,
    GameState : "/waiting",
    Questions : null,
    Imposter : null,
    NumberOfQuestions : 2,
    QuestionsAsked : 0
  }
  await db.collection("Games").doc(pinString).set(gameValues).then(sendGame(pinString, socket));
  pickQuestions(pinString);
}

async function createPlayer(playerData, socket) {
  console.log(5, "creating player");
  playerValues = {
    Host: playerData.Host,
    Name: playerData.Name,
    Score: 0,
    Status: true,
    Vote: "",
    Answer: "a",
    Pin: playerData.Pin
  }
  
  socket.send(JSON.stringify({Code: "Current Player", Player: playerValues}));
  await db.collection("Games").doc(playerData.Pin).collection("Players").doc(playerData.Name).set(playerData);
  sendPlayers(playerData.Pin, socket);

}

function sendGame(Pin, Socket) {
  console.log(4,"Sending Game");
  db.collection("Games").doc(pinString).get().then(function(doc) {
    if (doc.exists) {
        Socket.send(JSON.stringify({Code: "Game", Game: doc.data()}));
        startGameListener(Pin, Socket);
        
    }
    else {
      setTimeout(function() {sendGame(Pin, Socket);}, 100);
    }
  })
}



async function sendPlayers(Pin, Socket) {
  console.log(6, "sending Players");
  let PlayersList;
  db.collection("Games").doc(Pin).collection("Players").get().then(function(docQuery) {
      
      PlayersList = [];
      docQuery.forEach(function(doc) {
        var PlayersData = {};
        var data = doc.data()
        PlayersData= {
          Name : data.Name,
          Host : data.Host,
          Score : data.Score,
          Status : data.Status,
          Vote : data.Vote,
          Answer : data.Answer,
        }
        PlayersList.push(PlayersData);
        
    });
    Socket.send(JSON.stringify({Code: "Players", Players: PlayersList}));
    console.log(7, PlayersList);
    startPlayersListener(Pin, Socket)
});
  
}

async function startPlayersListener(Pin, Socket) {
  console.log(8, "sending Players");
  let PlayersList;
  db.collection("Games").doc(Pin).collection("Players").onSnapshot(function(docQuery) {
      
      PlayersList = [];
      docQuery.forEach(function(doc) {
        var PlayersData = {};
        var data = doc.data()
        PlayersData= {
          Name : data.Name,
          Host : data.Host,
          Score : data.Score,
          Status : data.Status,
          Vote : data.Vote,
          Answer : data.Answer,
        }
        PlayersList.push(PlayersData);
        
    });
    Socket.send(JSON.stringify({Code: "Players", Players: PlayersList}));
    console.log(9, PlayersList);
});
  
}

function startGameListener(Pin, Socket) {
  console.log(10,"Sending Game");
  db.collection("Games").doc(Pin).onSnapshot(function(doc) {
        Socket.send(JSON.stringify({Code: "Game", Game: doc.data()}));
    
  })
}




async function pickQuestions(Pin) {
  var q1;
  var q2;
  
  await getQuestion("Question1").then(function(question) {q1 = question});
  await getQuestion("Question2").then(function(question) {q2 = question}); 
  console.log("this is q2",q2);
  db.collection("Games").doc(Pin).update({Questions: [q1,q2]});

  
  
  
}


function getQuestion(qID) {

  return new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  console.log(qID);
   db.collection("Questions").doc(qID).get().then(function(doc) {
    var qData = doc.data();
    console.log(qID, qData);
    question = {
      Text : qData.Title,
      AltText : qData.ImposterTitle,
    }
    resolve(question);
  })
  
})}