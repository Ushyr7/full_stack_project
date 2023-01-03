const express = require('express');
const bodyParser = require("body-parser");
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

const testSleep = async () => {
    await sleep(10000);
}

testSleep();
const mysqlConnection = require("./connection");
const cors = require('cors');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//importation des routes
const productRoutes = require('./routes/product');
const shopRoutes = require('./routes/shop');
const categoryRoutes = require('./routes/category');

app.use(cors());


app.use(bodyParser.json());

app.use('', shopRoutes);
app.use('', productRoutes);
app.use('', categoryRoutes);


app.listen(process.env.PORT, () => console.log('Server started on port ' + process.env.PORT + ' ...'));
