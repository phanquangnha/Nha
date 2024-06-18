const POST = 8700
// const express = require('express');
// const cors = require('cors');

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
//routes
import authRoutes from "./routes/auth.js";
import podcastsRoutes from "./routes/podcast.js";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";
import commentRoutes from "./routes/comment.js";

const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
// app.use(morgan('tiny'));
// app.disable('x-powered-by');
// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const API_KEY = ''

// const url = `mongodb+srv://lequangdoanh:Quangdoanh510@quangdoanh.raqrf6j.mongodb.net`;
const url = `mongodb+srv://nhaphan:nhaphan123@podstream.xvsi5t8.mongodb.net/?retryWrites=true&w=majority&appName=podstream`;

const port = process.env.PORT || 8700;

const connect = () => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

app.post('/completions', async (req, res) =>{
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "how are you"}],
            max_tokens: 100, 
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error){
        console.error(error)
    }
})
//

// // Replace the following with your actual MongoDB URI
// const uri = 'mongodb://localhost:27017/your-database-name';

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Your code here
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//   });
//   //

app.use(express.json());
// app.enable('trust proxy'); // optional, not needed for secure cookies
// app.use(express.session({
//     secret : '123456',
//     key : 'sid',
//     proxy : true, // add this when behind a reverse proxy, if you need secure cookies
//     cookie : {
//         secure : true,
//         maxAge: 5184000000 // 2 months
//     }
// }));

app.use("/api/auth", authRoutes);
app.use("/api/podcasts", podcastsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes)
app.use("/api/comment", commentRoutes)


// app.use("/api/team", teamRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(port, () => {
    console.log("Connected");
    connect();
});
