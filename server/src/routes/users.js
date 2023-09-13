import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY= process.env.SECRET_KEY;

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save()

    res.json({ message: "User added successfuly!" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({ message: "User does not exist."});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "Username or Password is incorrect."})
    }

    const token = jwt.sign({id: user._id}, SECRET_KEY);
    res.json({ token, userID: user._id });

});



export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
            console.log("JWT Verification Error:", err);
            return res.sendStatus(403);
        }

        req.userId = decodedToken.id;
        next();
    });
};
