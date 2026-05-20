const express = require('express');
const router = express.Router();
const {listaContato, buscarUm, inserir, update, remove} = require('../controllers/usuarioController');

router.get('/usuarios', listaContato);
router.get('/usuarios/:id', buscarUm);
router.post('/usuarios', inserir);
router.put('/usuarios/:id', update); 
router.delete('/usuarios/:id', remove); 

module.exports = router;