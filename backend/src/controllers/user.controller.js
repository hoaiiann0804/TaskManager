const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const registerUser = async (req, res) => {
    const { username, email, password, phone, address } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (existingUser) return res.status(400).send({ message: "Email or Phone already exist" });
        const newUser = new User({
            username,
            email,
            password,
            phone,
            address,
        });
        await newUser.save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).send({ message: "User not found" });
        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) return res.status(400).send({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id, }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN});
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            sameSite: process.env.COOKIE_SAME_SITE,
            maxAge: process.env.COOKIE_MAX_AGE
        });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, phone: user.phone, address: user.address } });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const UserLogout = async (req, res) => {
    try {
        res.clearCookie("accessToken",{
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            sameSite: process.env.COOKIE_SAME_SITE,
        })
        res.json({
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "User logout failed"
        });
    }
}




module.exports = { registerUser, loginUser, UserLogout, 
    // getProfile, updateProfile 
    // };
}