const express = require("express");
const router = express.Router();
const db = require("../db");

// GET todos los clientes
router.get("/", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET cliente por id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM clientes WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(results[0]);
  });
});

// POST crear cliente
router.post("/", (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email)
    return res.status(400).json({ error: "Nombre y email son requeridos" });

  db.query(
    "INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)",
    [nombre, email, telefono || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, nombre, email, telefono });
    }
  );
});

// PUT actualizar cliente
router.put("/:id", (req, res) => {
  const { nombre, email, telefono } = req.body;
  db.query(
    "UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?",
    [nombre, email, telefono || null, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Cliente actualizado correctamente" });
    }
  );
});

// DELETE eliminar cliente
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM clientes WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cliente eliminado correctamente" });
  });
});

module.exports = router;
