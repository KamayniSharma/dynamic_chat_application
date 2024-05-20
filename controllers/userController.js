const user = require('../models/userModel');
const bcrypt = require('bcrypt');

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
        res.render('dashboard', { user: req.session.user })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    registerLoad,
    loadLogin,
    login,
    logout,
    loadDashboard
}