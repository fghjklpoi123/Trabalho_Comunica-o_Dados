require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const corsConfig = {
    origin: '*', 
    method: ['POST', 'GET'], 
    allowedHead: ['Content-Type', 'Authorization'] 
}
app.use(cors(corsConfig));

app.use(express.json());
app.use(bodyParser.json({
    type: 'application/**json'
}))

app.use(bodyParser.urlencoded({
    extended: true
}))

const contatoRoute = require('./routes/usuarioRoute');
app.use('/', contatoRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('http://localhost:'+PORT);
})