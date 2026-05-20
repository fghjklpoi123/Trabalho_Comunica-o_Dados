const { buscarTodos, buscarUm, atualizar, inserir, deletar } = require('../models/contato');

exports.listaContato = async (req, res) => {
    let result = await buscarTodos()
    res.json(result);
}

exports.buscarUm = async (req, res) => {
    let id = req.params.id;
    let result = await buscarUm(id);
    res.json(result);
}

exports.inserir = async (req, res) => {
    console.log(req.body)
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                error: 'Nome obrigatorio'
            });
        }
        const novoId = await inserir(name);
        res.json({
            id: novoId, name: name
        })
    } catch (error) {
        res.status(500).json({ error: 'Error ao inserir contato' });
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Validações
        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido'
            });
        }

        if (!name || name.trim() === '') {
            return res.status(400).json({
                error: 'Nome obrigatório e não pode estar vazio'
            });
        }

        const resultado = await atualizar(id, name);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Contato não encontrado'
            });
        }

        res.status(200).json({
            message: 'Contato atualizado com sucesso',
            id: parseInt(id),
            name: name
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar contato' });
    }
}

exports.remove = async (req, res) => {
    try {
        let id = req.params.id;

        if (!id) {
            return res.status(400).json({
                error: 'ID não encontrado'
            });
        }

        await deletar(id);
        res.json({
            message: 'Contato deletado com sucesso'
        });

    } catch (error) {
        res.status(500).json({ error: 'Error ao deletar contato' });
    }
}