const { buscarTodos, buscarUm, atualizar, inserir, deletar, buscarPorEmail } = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const novoId = await inserir(nome, email, senhaHash);

        res.status(201).json({ id: novoId, nome, email });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const usuario = await buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1m' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

exports.listaUsuarios = async (req, res) => {
    try {
        const result = await buscarTodos();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

exports.buscarUm = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await buscarUm(id);
        if (!result) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        if (!nome || nome.trim() === '') {
            return res.status(400).json({ error: 'Nome obrigatório e não pode estar vazio' });
        }

        if (!email || email.trim() === '') {
            return res.status(400).json({ error: 'Email obrigatório e não pode estar vazio' });
        }

        const resultado = await atualizar(id, nome, email);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso', id: parseInt(id), nome, email });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID não encontrado' });
        }

        await deletar(id);
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status  (500).json({ error: 'Erro ao deletar usuário' });
    }
};
