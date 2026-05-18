const express = require("express");
const router = express.Router();
const db = require("../db");

// GET todos los horarios (con nombre de película y sala)
router.get("/", (req, res) => {
  const sql = `
    SELECT h.id, p.titulo AS pelicula, s.nombre AS sala,
           h.fecha, h.hora, h.precio
    FROM horarios h
    JOIN peliculas p ON h.pelicula_id = p.id
    JOIN salas s ON h.sala_id = s.id
    ORDER BY h.fecha, h.hora
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET horario por id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM horarios WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Horario no encontrado" });
    res.json(results[0]);
  });
});

// POST crear horario
router.post("/", (req, res) => {
  const { pelicula_id, sala_id, fecha, hora, precio } = req.body;
  if (!pelicula_id || !sala_id || !fecha || !hora || !precio)
    return res.status(400).json({ error: "Todos los campos son requeridos" });

  db.query(
    "INSERT INTO horarios (pelicula_id, sala_id, fecha, hora, precio) VALUES (?, ?, ?, ?, ?)",
    [pelicula_id, sala_id, fecha, hora, precio],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, pelicula_id, sala_id, fecha, hora, precio });
    }
  );
});

// PUT actualizar horario
router.put("/:id", (req, res) => {
  const { pelicula_id, sala_id, fecha, hora, precio } = req.body;
  db.query(
    "UPDATE horarios SET pelicula_id = ?, sala_id = ?, fecha = ?, hora = ?, precio = ? WHERE id = ?",
    [pelicula_id, sala_id, fecha, hora, precio, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Horario actualizado correctamente" });
    }
  );
});

// DELETE eliminar horario
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM horarios WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Horario eliminado correctamente" });
  });
});

module.exports = router;
