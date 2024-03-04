const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./router/index');
// const router = require('./router/product.route');
const app = express();

app.use(bodyParser.json());

app.use('/api', routes)

mongoose.connect('mongodb+srv://manali:PjD4OOur7JEQtSqF@cluster0.wycr8tj.mongodb.net/newdatabase',
{
    useNewUrlParser : true
}).then(() => {
    console.log('database')
}).catch((err) => {
    console.log('err', err.message)
})

app.listen(3000, ()=> {
    console.log('Server listen at 3000');
})