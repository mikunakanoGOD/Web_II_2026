const express = require("express");
const router = express.Router();
const db = require("../db");

// GET todos los boletos (con detalle)
router.get("/", (req, res) => {
  const sql = `
    SELECT b.id, c.nombre AS cliente, p.titulo AS pelicula,
           s.nombre AS sala, h.fecha, h.hora, b.asiento, b.fecha_compra
    FROM boletos b
    JOIN clientes c ON b.cliente_id = c.id
    JOIN horarios h ON b.horario_id = h.id
    JOIN peliculas p ON h.pelicula_id = p.id
    JOIN salas s ON h.sala_id = s.id
    ORDER BY b.fecha_compra DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET boleto por id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM boletos WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Boleto no encontrado" });
    res.json(results[0]);
  });
});

// POST crear boleto
router.post("/", (req, res) => {
  const { horario_id, cliente_id, asiento } = req.body;
  if (!horario_id || !cliente_id || !asiento)
    return res.status(400).json({ error: "Todos los campos son requeridos" });

  db.query(
    "INSERT INTO boletos (horario_id, cliente_id, asiento) VALUES (?, ?, ?)",
    [horario_id, cliente_id, asiento],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, horario_id, cliente_id, asiento });
    }
  );
});

// PUT actualizar boleto
router.put("/:id", (req, res) => {
  const { horario_id, cliente_id, asiento } = req.body;
  db.query(
    "UPDATE boletos SET horario_id = ?, cliente_id = ?, asiento = ? WHERE id = ?",
    [horario_id, cliente_id, asiento, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Boleto actualizado correctamente" });
    }
  );
});

// DELETE eliminar boleto
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM boletos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Boleto eliminado correctamente" });
  });
});

module.exports = router;
