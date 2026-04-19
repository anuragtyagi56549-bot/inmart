// 1. IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// 2. MIDDLEWARE
app.use(cors({
  origin: "*"
}));
app.use(express.json());


// 3. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// 4. SCHEMA
const UserSchema = new mongoose.Schema({
    Username: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);


// 5. ROUTES

// Register
app.post("/register", async (req, res) => {
    const { Username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ Username });

        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            Username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({ message: "User Registered Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ message: "Server error" });
    }
});


// Login
app.post("/login", async (req, res) => {
    const { Username, password } = req.body;

    try {
        const user = await User.findOne({ Username });

        if (!user) {
            return res.json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: "Invalid password" });
        }

        res.json({ message: "Login successful" });

    } catch (error) {
        console.log(error);
        res.json({ message: "Server error" });
    }
});


// 6. START SERVER (👉 ALWAYS LAST)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});