import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./conexion.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// GET - listar todos
app.get("/clientes", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - por id
app.get("/clientes/:id", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Cliente no encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - crear
app.post("/clientes", async (req, res) => {
    try {
        const { id, nombre, email } = req.body;
        await pool.query("INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)", [id, nombre, email]);
        res.status(201).json({ id, nombre, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - actualizar
app.put("/clientes/:id", async (req, res) => {
    try {
        const { nombre, email } = req.body;
        await pool.query("UPDATE clientes SET nombre=?, email=? WHERE id=?", [nombre, email, req.params.id]);
        res.json({ mensaje: "actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - eliminar
app.delete("/clientes/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM clientes WHERE id=?", [req.params.id]);
        res.json({ mensaje: "eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en puerto ${process.env.PORT}`);
});
