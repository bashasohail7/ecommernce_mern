const express =require('express');
const app=express()
app.use(express.json())
const dotenv=require('dotenv')

//config
dotenv.config()
const productRoutes=require('./routes/productRoute')

app.use('api/v1',productRoutes)

module.exports=app;