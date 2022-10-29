const express = require('express');
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const cors = require('cors');
const app = express();
require('dotenv').config();

//importation des routes
const productRoutes = require('./routes/product');
const shopRoutes = require('./routes/shop');
const categoryRoutes = require('./routes/category');

app.use(cors());


app.use(bodyParser.json());

app.use('', shopRoutes);
app.use('', productRoutes);
app.use('', categoryRoutes);


app.listen(8080, () => console.log('Server started on port ' + process.env.PORT + ' ...'));
