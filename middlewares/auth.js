const isLogin = async (req, res, next) => {
    try {

        if (req.session.user) {

        } else {
            res.redirect('/login');
        }
        next();
    } catch (error) {
        console.log(error);
    }
}


const isLogout = async (req, res, next) => {
    try {

        if (req.session.user) {
            res.redirect('/dashboard');
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    isLogin,
    isLogout
}