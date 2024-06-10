const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.MONGO_URL;
module.exports = mongoose.connect('mongodb://127.0.0.1:27017/360football', {
    socketTimeoutMS: 1000
    // Note that mongoose will **not** pull `bufferCommands` from the query string
  }).then(response=> {
    console.log("connected db")
  }).catch(err=> {
    console.log("error connection db")
  })

