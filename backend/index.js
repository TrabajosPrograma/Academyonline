//importar librerias
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//database
// Connect to MongoDB
mongoose.connect('mongodb://francesca:francesca+99@cluster0-shard-00-00.xk8k5.mongodb.net:27017,cluster0-shard-00-01.xk8k5.mongodb.net:27017,cluster0-shard-00-02.xk8k5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-f8gp1z-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection.once('open', function(){
  console.log('Conectado Mongodb');
}).on('error', function(error){
    console.log('Error is: ', error);
});
//rutas
app.use('/api/category', require('./rutas/category'));

// escucha el servidor
const port = process.env.PORT;

app.listen(5000)