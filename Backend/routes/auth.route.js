const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

//Auth
router.post('/signup', auth.userSignup)
router.post('/login', auth.userLogin)

//OTP
router.route('/otp')
    .post(auth.verifyOTP)
    .put(auth.resendOTP);

//Session
router.route('/session')
    .get(auth.refreshToken)
    .delete(auth.userLogout);

module.exports = router;