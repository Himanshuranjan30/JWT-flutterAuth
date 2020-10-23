const express=require('express')
const app= express()
const authRoute= require('./routes/auth')
const mongoose= require('mongoose')
const dotenv= require('dotenv')
const postroute= require('./routes/post')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>console.log('Connected to DB'))
app.use(express.json());
app.use('/api/user',authRoute);
app.use('/api/posts',postroute);
app.listen(3000,()=>console.log('Server up and running'))