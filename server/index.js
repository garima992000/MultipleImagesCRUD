import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import './Config/db.js'
import userRoutes from './Routes/userRoutes.js';
const PORT=process.env.PORT;
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users',userRoutes);
app.listen(PORT,()=>{console.log(`Server connected to PORT: ${PORT}`)})