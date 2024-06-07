const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const Chat = require('../models/chatModel');
const Group = require('../models/groupModel');
const Member = require("../models/memberModel")

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
                res.cookie('user', JSON.stringify(existUser));
                console.log("@@@@", req.session.user);
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
        res.clearCookie('user');
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

const deleteChat = async (req, res) => {
    try {

        await Chat.deleteOne({ _id: req.body.id });
        res.status(200).send({ success: true });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const updateChat = async (req, res) => {
    try {

        await Chat.findByIdAndUpdate({ _id: req.body.id }, {
            $set: { message: req.body.message }
        });
        res.status(200).send({ success: true });


    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const loadGroups = async (req, res) => {
    try {

        const groups = await Group.find({ creator_id: req.session.user._id });
        res.render('groups', { groups: groups });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


const createGroup = async (req, res) => {
    try {
        // console.log("groupbpdy", req.body);
        const group = new Group({
            creator_id: req.session.user._id,
            name: req.body.name,
            image: 'images/' + req.file.filename,
            limit: req.body.limit
        })

        await group.save();
        res.render('groups', { message: `${req.body.name} group is created`, groups: group })

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


const getMembers = async (req, res) => {
    try {

        const users = await user.find({ _id: { $nin: [req.session.user._id] } })
        res.status(200).send({ success: true, data: users });


    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


const addMembers = async (req, res) => {
    try {
        // console.log("members",req.body.members);
        if (!(req.body.members) || req.body.members.length == 0) {
            res.status(200).send({ success: false, msg: "Please select any one member" });
        } else if (req.body.members.length > parseInt(req.body.limit)) {
            res.status(200).send({ success: false, msg: `You cannot select more than ${req.body.limit} members` });
        } else {
            await Member.deleteMany({ group_id: req.body.group_id });

            var data = [];
            const members = req.body.members;
            for (let i = 0; i < members.length; i++) {
                data.push({
                    group_id: req.body.group_id,
                    user_id: members[i]
                });
            }

            await Member.insertMany(data);

            res.status(200).send({ success: true, msg: "Members added successfully" });

        }


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
    saveChat,
    deleteChat,
    updateChat,
    loadGroups,
    createGroup,
    getMembers,
    addMembers
}