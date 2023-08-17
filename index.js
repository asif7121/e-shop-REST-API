import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import indexRouter from './app.router.js'
import logger from './config/logger.js';


const app = express();
const PORT = 9000;

const dbURL =process.env.DB_URL;

mongoose.connect(dbURL); 

const db = mongoose.connection;
db.on("error", console.log.bind("connection error:"));
db.once("open", ()=> {
    logger.info("Database connected successfully!")
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/v1',indexRouter)

app.use((err, req, res, next)=>{
    if(err) return logger.error(err)
    return next()
})

app.listen(PORT, (req, res)=> {
    logger.info(`App is running on Port ${PORT}`)
})
