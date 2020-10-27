import Server from 'socket.io'
import * as admin from 'firebase-admin';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')
    
    const io = new Server(res.socket.server)

    io.on('connection', socket => {
      socket.broadcast.emit('a user connected');
      socket.on('hello', msg => {
        console.log(msg);
        socket.emit("hello");
      })
      socket.on('Create Game', msg => {createGame(msg);});
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler



const serviceAccount = require('../../public/test-cd477-c2b88dd9fb20.json');
console.log("init");
if (!admin.apps.length) {
   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();


function createGame(msg) {
  console.log(msg.pin);
  db.collection("Games").doc(msg.pin).set(msg);
}