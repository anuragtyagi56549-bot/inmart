console.log("Server starting...");
require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);

// 1. IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// 2. MIDDLEWARE
app.use(cors({
  origin: "*"
}));
app.use(express.json());


// 3. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected ✅");
})
.catch((err) => {
    console.log("MongoDB Error ❌:", err);
});


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
<<<<<<< Updated upstream
=======
    console.log("BODY RECEIVED:", req.body); // 👈 ADD THIS       

>>>>>>> Stashed changes
    const { Username, email, password } = req.body;

    // ✅ ADD THIS
    if (!Username || !email || !password) {
        return res.json({ message: "All fields are required" });
    }

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
        console.log("FULL ERROR:", error);
        res.json({ message: error.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { Username, password } = req.body;

    // ✅ ADD THIS
    if (!Username || !password) {
        return res.json({ message: "All fields are required" });
    }

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
        console.log("FULL ERROR:", error);
        res.json({ message: error.message });
    }
});


// 6. START SERVER (👉 ALWAYS LAST)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});