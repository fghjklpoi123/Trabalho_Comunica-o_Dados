require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const corsConfig = {
    origin: '*', //local de onde pode receber requisao
    method: ['POST', 'GET'], // metodo permitido
    allowedHead: ['Content-Type', 'Authorization'] //cabeçcario permitido
}
app.use(cors(corsConfig));

app.use(express.json());
app.use(bodyParser.json({
    type: 'application/**json'
}))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function(req, res){
    res.send('Olá mundo');
})
app.get('/sobre', function(req, res){
    res.send('Olá sobre');
})
app.get('/sobre/:id', function(req, res){
    const id = req.params.id;
    res.send(`Olá sobre ${id}` + '-' + id);
})

const contatoRoute = require('./routes/contatoRoute');
app.use('/', contatoRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('http://localhost:'+PORT);
})