require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
var mongoose = require('mongoose');
const path = require('path');
const User = require('./models/userModel');
const Chat = require('./models/chatModel');

const { SESSION_SECRET } = process.env;


//_____MONGOOSE CONNECT______

mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app');


//________SETTING SESSIONS, STATIC FILES, VIEW ENGINES_____
app.use(session({ secret: SESSION_SECRET }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('views', path.join(__dirname, './views'))
app.set("view engine", "ejs");


//_________ROUTES__________
const userRoute = require('./routes/userRoutes')
app.use('/', userRoute)


//_______CONNECT TO SERVER___________
const http = require('http').Server(app);

http.listen(3000, () => {
    console.log("Server is running on port 3000");
});

const io = require('socket.io')(http);

const usp = io.of('/user-namespace');

usp.on('connection', async (socket) => {
    console.log('User connected');

    const userId = socket.handshake.auth.token;

    await User.findByIdAndUpdate({ _id: userId }, { $set: { isOnline: '1' } });

    //broadcasting user online status
    socket.broadcast.emit('getOnlineUser', { user_id: userId });


    socket.on('disconnect', async () => {
        console.log('User disconnected');
        await User.findByIdAndUpdate({ _id: userId }, { $set: { isOnline: '0' } });

        //broadcasting user offline status
        socket.broadcast.emit('getOfflineUser', { user_id: userId });
    });

    //show user's chat
    socket.on('newChat', (data) => {
        socket.broadcast.emit('loadNewChat', data);
    });

    //load old chats
    socket.on('existingChat', async (data) => {
        var chats = await Chat.find({
            $or: [{ sender_id: data.sender_id, receiver_id: data.receiver_id },
            { sender_id: data.receiver_id, receiver_id: data.sender_id }
            ]
        });

        socket.emit('loadChats', { chats: chats });
    });

    socket.on('chatDeleted', (id) => {
        socket.broadcast.emit('chatMessageDeleted', id);
    })


    //update chats
    socket.on('chatUpdated', (data) => {
        socket.broadcast.emit('chatMessageUpdated', data)
    })


});