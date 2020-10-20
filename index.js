const express = require('express')
const app = express()
const port = 3000
const admin = require("firebase-admin");
const morgan = require('morgan')
const cors = require("cors");
const fs = require("fs");

const serviceAccountSnapshot = require("./service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountSnapshot),
  databaseURL: "https://provo-buddy.firebaseio.com"
});

const counter = require("./counter");

app.use(morgan("combined"))
app.use(cors())

app.get('/', (req, res) => {
  res.send('What are you doing here???')
})

app.use("/counter", counter)

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })
} else {
  const privateKey = fs.readFileSync( '/etc/letsencrypt/live/provobuddy.com/privkey.pem' );
  const certificate = fs.readFileSync( '/etc/letsencrypt/live/provobuddy.com/cert.pem' );

  https.createServer({
      key: privateKey,
      cert: certificate
  }, app).listen(port, () => {
    console.log(`App listening on ${port}`)
  })
}
