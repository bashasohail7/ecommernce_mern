const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path =require('path');
const productRoutes =require('./routes/productRoute');
const connectDatabase = require('./config/database');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const PORT=process.env.PORT

app.use('/api/v1',productRoutes)

    connectDatabase()
    app.listen(PORT,()=>console.log('server running succesfully on the port ',PORT))


