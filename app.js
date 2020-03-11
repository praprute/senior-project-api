const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const cors = require('cors');
require('dotenv').config()

//import routes
const authRoutes = require('./authRoutes/auth');
const userRoutes = require('./authRoutes/user');
const categoryRoutes = require('./authRoutes/category');
const productRoutes = require('./authRoutes/product');

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => {
    console.log('DB Connect')
})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(validator());
app.use(cors());

//routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on portg ${port}`);
})


