const express = require('express');
const router = express.Router();
const {listaContato, buscarUm, inserir, update, remove} = require('../controllers/contatoController');

router.get('/contatos', listaContato);
router.get('/contatos/:id', buscarUm);
router.post('/contatos', inserir);
router.put('/contatos/:id', update); 
router.delete('/contatos/:id', remove); 



module.exports = router;