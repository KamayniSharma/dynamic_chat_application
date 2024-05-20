require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
var mongoose = require('mongoose');
const path = require('path');

const { SESSION_SECRET } = process.env;


//_____MONGOOSE CONNECT______

mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app');


//________SETTING SESSIONS, STATIC FILES, VIEW ENGINES_____
app.use(session({ secret: SESSION_SECRET}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('views', path.join(__dirname, './views'))
app.set("view engine", "ejs");


//_________ROUTES__________
const userRoute = require('./routes/userRoutes')
app.use('/',userRoute)


//_______CONNECT TO SERVER___________
const http = require('http').Server(app);

http.listen(3000, () => {
    console.log("Server is running on port 3000");
});