const express = require("express");
const { userSignup, verifyOTP, userLogin, refreshToken, userLogout, resendOTP, } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.route("/otp")
    .post(verifyOTP)
    .put(resendOTP);
router.route("/session")
    .get(refreshToken)
    .delete(userLogout);

module.exports = router;