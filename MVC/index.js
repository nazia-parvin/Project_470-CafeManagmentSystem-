const express = require("express");
var cors = require('cors');
const connection = require('./Model');
const userRoute = require('./Controller/user');
const categoryRoute = require('./Controller/category');
const productRoute = require('./Controller/product');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/category',categoryRoute);
app.use('/product',productRoute);


module.export = app;