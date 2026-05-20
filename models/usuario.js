const db = require('../db');

const createTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
    )
`;

db.query(createTable, (error, result) => {
    if (error) {
        console.error('Erro ao criar tabela:', error);
    } else {
        console.log('Tabela usuarios criada com sucesso!');
    }
});

module.exports = {
    buscarTodos: () => {
        return new Promise((res, req) => {
            db.query('SELECT * FROM usuarios', (error, results) => {
                if (error) { req(error); return }
                res(results)
            })
        })
    },
    buscarUm: (id) => {
        return new Promise((res, req) => {
            db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
                if (err) reject(err);
                else res(result[0]);
            });
        })
    },
    inserir: (name, email, senha) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO usuarios (name, email, senha) VALUES (?, ?, ?)', [name, email, senha], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            })
        });
    },
    atualizar: (id, name, email, senha) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE usuarios SET name = ?, email = ?, senha = ? WHERE id = ?', [id, name, email, senha], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        });
    },
    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        });
    }
}