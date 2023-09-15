import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {userRouter} from './routes/users.js'
import {recipesRouter} from './routes/recipes.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/Auth", userRouter)
app.use("/Recipes", recipesRouter)

mongoose.connect(
    process.env.MONGODB_URI
    
    )
app.listen(port, () => console.log(`SERVER STARTED AT ${port}!`));