require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var mongoose = require('mongoose');
const path = require('path');


// Mongoose Connect

mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app');

// Routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

app.set('views', path.join(__dirname, './views'))
app.set("view engine", "ejs");

const userRoute = require('./routes/userRoutes')
app.use('/',userRoute)

//   Connect to Server

const http = require('http').Server(app);

http.listen(3000, () => {
    console.log("Server is running on port 3000");
})