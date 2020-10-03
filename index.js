const express = require('express')
const app = express()
const port = 3000
const admin = require("firebase-admin");
const morgan = require('morgan')
const cors = require("cors");

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
