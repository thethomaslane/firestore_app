const express = require('express')
const next = require('next')
const admin = require('firebase-admin')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()
    
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

const serviceAccount = require('./public/test-cd477-c2b88dd9fb20.json');
console.log("init");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const socket = require('./socketio.js')
