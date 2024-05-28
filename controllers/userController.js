const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const Chat = require('../models/chatModel');

const register = async (req, res) => {
    try {

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const User = new user({
            name: req.body.name,
            email: req.body.email,
            image: 'images/' + req.file.filename,
            password: passwordHash,
        })

        await User.save();

        res.render('register.ejs', { message: 'Registration successfull' });

    } catch (error) {
        console.log(error);
    }
}


const registerLoad = async (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(error);
    }
}

const loadLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existUser = await user.findOne({ email: email });

        if (existUser) {
            const passworrdMatch = await bcrypt.compare(password, existUser.password);
            if (passworrdMatch) {
                req.session.user = existUser;
                console.log("@@@@",req.session.user);
                res.redirect('/dashboard');
            } else {
                res.render('login', { message: 'Email or Password is incorrect' })
            }
        } else {
            res.render('login', { message: 'Email or Password is incorrect' });
        }
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req, res) => {
    try {

        req.session.destroy();
        res.redirect('/login');

    } catch (error) {
        console.log(error);
    }
}


const loadDashboard = async (req, res) => {
    try {
        // console.log(req.session);
        const users = await user.find({ _id: { $nin: [req.session.user._id] } })
        res.render('dashboard', { user: req.session.user, users: users })

    } catch (error) {
        console.log(error);
    }
}

const saveChat = async (req, res) => {
    try {

        const chat = new Chat({
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            message: req.body.message,
        })
        let newChat = await chat.save();

        res.status(200).send({ success: true, msg: 'Chat saved', data: newChat });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    register,
    registerLoad,
    loadLogin,
    login,
    logout,
    loadDashboard,
    saveChat
}