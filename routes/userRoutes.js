const express = require('express');
const router = express.Router();
const app = express();
const ejs = require('ejs');

const path = require('path');
const multer = require('multer');

const usercontroller = require('../controllers/userController');
const auth = require('../middlewares/auth');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})

const upload = multer({ storage: storage });


router.get('/register', auth.isLogout, usercontroller.registerLoad);
router.post('/register', upload.single('image'), usercontroller.register);

router.get('/login', auth.isLogout, usercontroller.loadLogin);
router.post('/login', usercontroller.login);
router.get('/logout', auth.isLogin, usercontroller.logout);

// router.get('*', (req, res) => {
//     res.redirect('/');
// })

router.get('/dashboard', auth.isLogin, usercontroller.loadDashboard);
router.post('/save-chat', usercontroller.saveChat);
router.post('/delete-chat', usercontroller.deleteChat);
router.post('/update-chat', usercontroller.updateChat);


module.exports = router;