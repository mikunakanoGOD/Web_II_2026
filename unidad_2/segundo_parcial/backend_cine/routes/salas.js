const express = require("express");
const router = express.Router();
const db = require("../db");

// GET todas las salas
router.get("/", (req, res) => {
  db.query("SELECT * FROM salas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET sala por id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM salas WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Sala no encontrada" });
    res.json(results[0]);
  });
});

// POST crear sala
router.post("/", (req, res) => {
  const { nombre, capacidad, tipo } = req.body;
  if (!nombre || !capacidad || !tipo)
    return res.status(400).json({ error: "Todos los campos son requeridos" });

  db.query(
    "INSERT INTO salas (nombre, capacidad, tipo) VALUES (?, ?, ?)",
    [nombre, capacidad, tipo],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, nombre, capacidad, tipo });
    }
  );
});

// PUT actualizar sala
router.put("/:id", (req, res) => {
  const { nombre, capacidad, tipo } = req.body;
  db.query(
    "UPDATE salas SET nombre = ?, capacidad = ?, tipo = ? WHERE id = ?",
    [nombre, capacidad, tipo, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Sala actualizada correctamente" });
    }
  );
});

// DELETE eliminar sala
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM salas WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Sala eliminada correctamente" });
  });
});

module.exports = router;
