const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((res, req) => {
            db.query('SELECT * FROM contatos', (error, results) => {
                if (error) { req(error); return }
                res(results)
            })
        })
    },
    buscarUm: (id) => {
        return new Promise((res, req) => {
            db.query('SELECT * FROM contatos WHERE id = ?', [id], (err, result) => {
                if (err) reject(err);
                else res(result[0]);
            });
        })
    },
    inserir: (name) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO contatos (name) VALUES (?)', [name], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            })
        });
    },
    atualizar: (id, name) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE contatos SET name = ? WHERE id = ?', [name, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        });
    },
    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM contatos WHERE id = ?', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        });
    }
}