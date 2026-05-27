const express = require('express');
const router = express.Router();
const { listaUsuarios, buscarUm, update, remove, register, login } = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/usuarios', authMiddleware, listaUsuarios);
router.get('/usuarios/:id', authMiddleware, buscarUm);
router.put('/usuarios/:id', authMiddleware, update);
router.delete('/usuarios/:id', authMiddleware, remove);

module.exports = router;
