const express = require('express');
const dotenv = require('dotenv').config();
var cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();
//conexión a la DB
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('BDD conectada'))
.catch((err)=> console.log('DB no conectada',err))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));