const express = require('express');
const { signUp, login } = require('../controllers/authController');
const { signUpValidator, loginValidator } = require('../utils/validators/authValidators');

const router = express.Router()

router.route('/signup').post(signUpValidator, signUp);
router.route('/login').post(loginValidator, login);


module.exports = router;