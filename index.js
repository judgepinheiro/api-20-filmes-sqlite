const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Conecta ao banco
const db = new sqlite3.Database('./database.db');

// Cria tabela se não existir
db.run(`
CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    diretor TEXT NOT NULL,
    ano INTEGER NOT NULL
)
`);

// ================= GET (LISTAR) =================
app.get('/filmes', (req, res) => {
    const { ano, page = 1, limit =3000, ordem = 'ASC' } = req.query;

    let query = "SELECT * FROM filmes WHERE 1=1";
    let params = [];

    // Filtro por ano
    if (ano) {
        query += " AND ano = ?";
        params.push(ano);
    }

    // Ordenação
    query += ` ORDER BY ano ${ordem}`;

    // Paginação
    query += " LIMIT ? OFFSET ?";
    params.push(limit, (page - 1) * limit);

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(200).json(rows);
    });
});

// ================= GET POR ID =================
app.get('/filmes/:id', (req, res) => {
    db.get("SELECT * FROM filmes WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });

        if (!row) {
            return res.status(404).json({ erro: "Filme não encontrado" });
        }

        res.status(200).json(row);
    });
});

// ================= POST =================
app.post('/filmes', (req, res) => {
    const { titulo, diretor, ano } = req.body;

    // Validação
    if (!titulo || !diretor || !ano) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    db.run(
        "INSERT INTO filmes (titulo, diretor, ano) VALUES (?, ?, ?)",
        [titulo, diretor, ano],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });

            res.status(201).json({
                id: this.lastID,
                titulo,
                diretor,
                ano
            });
        }
    );
});

// ================= PUT =================
app.put('/filmes/:id', (req, res) => {
    const { titulo, diretor, ano } = req.body;

    if (!titulo || !diretor || !ano) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    db.run(
        "UPDATE filmes SET titulo=?, diretor=?, ano=? WHERE id=?",
        [titulo, diretor, ano, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ erro: "Filme não encontrado" });
            }

            res.status(200).json({ mensagem: "Filme atualizado" });
        }
    );
});

// ================= DELETE =================
app.delete('/filmes/:id', (req, res) => {
    db.run(
        "DELETE FROM filmes WHERE id=?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ erro: "Filme não encontrado" });
            }

            res.status(200).json({ mensagem: "Filme removido" });
        }
    );
});

// ================= SERVIDOR =================
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});