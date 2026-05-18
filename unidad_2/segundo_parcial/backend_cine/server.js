const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/salas",     require("./routes/salas"));
app.use("/api/peliculas", require("./routes/peliculas"));
app.use("/api/horarios",  require("./routes/horarios"));
app.use("/api/clientes",  require("./routes/clientes"));
app.use("/api/boletos",   require("./routes/boletos"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
