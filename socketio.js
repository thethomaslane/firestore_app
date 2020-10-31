const Server = require('socket.io');
const host = "10.0.0.102"

const WebSocket = require('ws');
let socketDict = {};

 
var wss = new WebSocket.Server({ port: 8080, host: host });
var pinString;
console.log(1,"Socket Server Starting on ", host);
wss.on('connection', function connection(ws, req) {
  var userID = parseInt(req.url.substr(1), 10);
  socketDict[userID] = ws;
  let socket = ws;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(socketDict));

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
    if (data.Code == "Start Game") {startGame(data.Pin, socket)};
    if (data.Code == "Start Question") {startQuestion(data.Pin, socket, data.Host)};
    if (data.Code == "Submit Answer") {submitAnswer(data.Pin, socket, data.Answer, data.PlayerName);}
    if (data.Code == "Submit Vote") {submitVote(data.Pin, socket, data.Vote, data.PlayerName);}
    if (data.Code == "New Question") {newQuestion(data.Title, data.AltTitle);}
    
  });
  
});

const admin = require('firebase-admin');
db = admin.firestore();
admin.firestore().settings({
  ignoreUndefinedProperties: true,
})

async function createGame(gameData, socket) {
  console.log(3,"Game Creating");
  pinString = gameData.Pin;
  gameValues = {
    Pin: pinString,
    GameState : "waiting",
    Questions : null,
    Imposter : null,
    NumberOfQuestions : 5,
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
    Answer: "Failed to Answer",
    Pin: playerData.Pin,
    LastScored: null
  }
  
  socket.send(JSON.stringify({Code: "Current Player", Player: playerValues}));
  await db.collection("Games").doc(playerData.Pin).collection("Players").doc(playerData.Name).set(playerValues);
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
          LastScored: data.LastScored
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
          LastScored: data.LastScored
        }
        PlayersList.push(PlayersData);
        
    });
    Socket.send(JSON.stringify({Code: "Players", Players: PlayersList}));
    console.log(9);
});
  
}

function startGameListener(Pin, Socket) {
  console.log(10,"Sending Game");
  db.collection("Games").doc(Pin).onSnapshot(function(doc) {
        Socket.send(JSON.stringify({Code: "Game", Game: doc.data()}));
  })
}




async function pickQuestions(Pin) {
  let q1, q2, q3, q4, q5;
  await getQuestion("1").then(function(question) {q1 = question});
  await getQuestion("2").then(function(question) {q2 = question}); 
  await getQuestion("3").then(function(question) {q3 = question});
  await getQuestion("4").then(function(question) {q4 = question}); 
  await getQuestion("5").then(function(question) {q5 = question});
  db.collection("Games").doc(Pin).update({Questions: [q1,q2,q3,q4,q5]});

  
  
  
}


function getQuestion(qID) {

  return new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  console.log(qID);
   db.collection("Questions").doc(qID).get().then(function(doc) {
    var qData = doc.data();
    question = {
      Text : qData.Title,
      AltText : qData.ImposterTitle,
    }
    resolve(question);
  })
  
})}


async function startGame(Pin, Socket) {
  await pickImposter(Pin);
  db.collection("Games").doc(Pin).update({GameState: "question"});
}
async function startQuestion(Pin, Socket, Host) {
  console.log("startQuestion");
  setTimeout(function() {moveToVote(Pin, Socket, Host);}, 20000);
}
async function moveToVote(Pin, Socket, Host) {
  Socket.send(JSON.stringify({Code: "Submit Answer"}));
  await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('pop');
            resolve()
        }, 500);
    });
  console.log("pip");
  if (Host) {
    db.collection("Games").doc(Pin).update({GameState: "vote"});
  }
  setTimeout(function() {moveToScore(Pin, Socket, Host);}, 20000);
}

async function submitAnswer(Pin, Socket, Answer, PlayerName) {
  console.log("Answer Submitting", Answer);
  db.collection("Games").doc(Pin).collection("Players").doc(PlayerName).update({"Answer": Answer});
}

async function moveToScore(Pin, Socket, Host) {
  Socket.send(JSON.stringify({Code: "Submit Vote"}));
  await setTimeout(function() {}, 500);
  if (Host) {
    db.collection("Games").doc(Pin).update({GameState: "scoreboard"});
  }
  setTimeout(function() {moveToAfterScore(Pin, Socket, Host);}, 5000);
}

async function submitVote(Pin, Socket, Vote, PlayerName) {
  console.log(PlayerName, "Vote Submitting", Vote);
  let scoreAdd = 0;
  let questionNumber;
  let LastScored;
  let imposter; 
  await db.collection("Games").doc(Pin).get().then(function(doc){
      scoreAdd = 100;
      questionNumber = doc.data().QuestionsAsked;
      imposter = doc.data().Imposter;
    
  });
  await db.collection("Games").doc(Pin).collection("Players").doc(PlayerName).get().then(function(doc){
    LastScored = doc.data().LastScored;
  });
  console.log("Is the score valid?", (Vote == imposter && (questionNumber > LastScored || LastScored == null)));
  if (Vote == imposter && (questionNumber > LastScored || LastScored == null)) {
    scoreAdd = 100;
  } else {scoreAdd = 0;}
  console.log(PlayerName,"voted for", Vote, "on Question number", questionNumber, "they last voted on", LastScored,  "and the correct answer is", imposter, "and scored ", scoreAdd, " points");
  db.collection("Games").doc(Pin).collection("Players").doc(PlayerName).update({"Vote": Vote, Score: admin.firestore.FieldValue.increment(scoreAdd), LastScored: questionNumber, Answer: "Failed to Answer"});

}

async function moveToAfterScore(Pin, Socket, Host) {
  let questionsAsked;
  let numberOfQuestions;
  console.log("afterscore", Host);
  await setTimeout(function() {}, 500);
  if (Host) {
    await db.collection("Games").doc(Pin).update({QuestionsAsked: admin.firestore.FieldValue.increment(1)});
  }
  await db.collection("Games").doc(Pin).get().then(function(doc) {
    questionsAsked = doc.data().QuestionsAsked;
    numberOfQuestions = doc.data().NumberOfQuestions;
  });
  if (questionsAsked < numberOfQuestions) {
    if (Host) {startGame(Pin, Socket);}
  } else {
    db.collection("Games").doc(Pin).update({GameState: "winner"});
  }

}

async function pickImposter(Pin) {

  var imposterHelper = [];
  db.collection("Games").doc(Pin).collection("Players").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        imposterHelper.push(doc.id);
      });
    console.log("imposterHelper", imposterHelper);
  var imposter = imposterHelper[randomChoice(imposterHelper)];
  console.log("imposter",imposter);
  db.collection("Games").doc(pinString).update({Imposter: imposter});

  });
}


function randomChoice(arr) {
  var choice = Math.floor(Math.random() * arr.length);
  return choice;
}

function newQuestion(Title, AltTitle) {
  db.collection("New Questions").doc(Title).set({Title: Title, AltTitle: AltTitle});
}