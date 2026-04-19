import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://anuragtyagi56549_db_user:ndMDGReepb7XmAhx@instantmart.yg8dtpv.mongodb.net/instantmart")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    Username: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

app.post("/login", async (req, res) => {
    const { Username, password } = req.body;

    console.log("LOGIN HIT:", req.body); // 👈 debug

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
app.post("/register", async (req, res) => {
    console.log("API HIT ✅");   
    console.log(req.body);       

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
        res.json({ message: "Error registering user" });
    }
});

const users = await User.find();
console.log(users);


app.listen(5000, () => {
    console.log("Server running on port 5000");
});