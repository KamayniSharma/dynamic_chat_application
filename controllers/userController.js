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

module.exports = {
    register,
    registerLoad
}