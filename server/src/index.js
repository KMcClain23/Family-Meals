import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://snoopyods:MERNpassword123@cluster0.1uzhcuy.mongodb.net/Cluster0?retryWrites=true&w=majority"
    )

app.listen(3001, () => console.log("SERVER STARTED!"));