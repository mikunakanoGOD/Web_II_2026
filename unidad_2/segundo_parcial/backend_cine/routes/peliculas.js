const express = require("express");
const router = express.Router();
const db = require("../db");

// GET todas las películas
router.get("/", (req, res) => {
  db.query("SELECT * FROM peliculas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET película por id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM peliculas WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Película no encontrada" });
    res.json(results[0]);
  });
});

// POST crear película
router.post("/", (req, res) => {
  const { titulo, genero, duracion_min, clasificacion } = req.body;
  if (!titulo || !genero || !duracion_min || !clasificacion)
    return res.status(400).json({ error: "Todos los campos son requeridos" });

  db.query(
    "INSERT INTO peliculas (titulo, genero, duracion_min, clasificacion) VALUES (?, ?, ?, ?)",
    [titulo, genero, duracion_min, clasificacion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, titulo, genero, duracion_min, clasificacion });
    }
  );
});

// PUT actualizar película
router.put("/:id", (req, res) => {
  const { titulo, genero, duracion_min, clasificacion } = req.body;
  db.query(
    "UPDATE peliculas SET titulo = ?, genero = ?, duracion_min = ?, clasificacion = ? WHERE id = ?",
    [titulo, genero, duracion_min, clasificacion, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Película actualizada correctamente" });
    }
  );
});

// DELETE eliminar película
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM peliculas WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Película eliminada correctamente" });
  });
});

module.exports = router;
