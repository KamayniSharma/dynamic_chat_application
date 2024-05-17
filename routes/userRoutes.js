const express = require('express');
const router = express.Router();
const app = express();
const ejs = require('ejs');

const path = require('path');
const multer = require('multer');

const usercontroller = require('../controllers/userController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})

const upload = multer({  storage:storage });


router.get('/register', usercontroller.registerLoad);
router.post('/register', upload.single('image'), usercontroller.register);


module.exports = router;