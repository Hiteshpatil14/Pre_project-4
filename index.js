
require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const PORT =8080


const app = express();
app.use(express.json())
// require('./sendDatatoDb/sendData')
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on("connected",()=>{
    console.log("connected with db")
})
mongoose.connection.on("error",()=>{
    console.log("mongodb connection failed")
})


app.use(require('./Route/covidRoute'))

app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`)
})