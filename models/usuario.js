const db = require('../db');

const createTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
    )
`;

db.query(createTable, (error) => {
    if (error) {
        console.error('Erro ao criar tabela:', error);
    } else {
        console.log('Tabela usuarios criada com sucesso!');
    }
});

module.exports = {
    buscarTodos: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, nome, email FROM usuarios', (error, results) => {
                if (error) { reject(error); return; }
                resolve(results);
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, nome, email FROM usuarios WHERE id = ?', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        });
    },

    buscarPorEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        });
    },

    inserir: (nome, email, senha) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                [nome, email, senha],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result.insertId);
                }
            );
        });
    },

    atualizar: (id, nome, email) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
                [nome, email, id],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};
