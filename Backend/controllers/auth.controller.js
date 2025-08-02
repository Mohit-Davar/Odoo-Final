const auth = require('../database/auth.model');
const { sendEmail } = require("../service/sendMail");
const { OTPEmail } = require("../service/emailTemplates");
const redis = require("../service/redis");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
const generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

exports.userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isUser = await auth.getUserByEmail(email);
        if (isUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await auth.insertUser({ name, email, password: hashedPassword });

        const otp = generateOTP();
        await redis.setex(`otp:${email}`, 300, otp);
        await redis.setex(`delete_user:${email}`, 600, data.id);

        const html = OTPEmail({ name, email, otp });
        sendEmail("OTP Verification", null, html, 3, email);
        return res.status(201).json({ message: "OTP sent to email" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const storedOtp = await redis.get(`otp:${email}`);
        if (!storedOtp) return res.status(410).json({ message: "OTP expired, request a new one" });

        if (storedOtp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        const user = await auth.getUserByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        await redis.del(`otp:${email}`);
        await redis.del(`delete_user:${email}`);

        const accessToken = generateAccessToken({ id: user.id, email: user.email, name: user.name });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email, name: user.name });

        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await auth.getUserByEmail(email);
        if (!user) return res.status(401).json({ message: "Invalid email" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

        const accessToken = generateAccessToken({ id: user.id, email: user.email, name: user.name });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email, name: user.name });

        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.refreshToken = async (req, res) => {
    console.log("Refreshing token");
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token, please login again" });

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).json({ message: "Invalid credentials" });
            const newAccessToken = generateAccessToken({ id: user.id, email: user.email, name: user.name });
            return res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.userLogout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.resendOTP = async (req, res) => {
    const { email, name } = req.body;
    try {
        const user = await auth.getUserByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        await redis.setex(`otp:${email}`, 300, otp);

        const html = OTPEmail({ name, email, otp });
        sendEmail("OTP Verification", null, html, 3, email);
        return res.status(200).json({ message: "A new OTP has been sent to your email" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};