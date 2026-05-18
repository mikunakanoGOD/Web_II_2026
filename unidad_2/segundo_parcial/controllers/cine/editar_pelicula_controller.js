import { peliculaService } from "../../service/cine/cine-service.js";

const form = document.querySelector("[data-form]");
const id = new URLSearchParams(window.location.search).get("id");

if (!id) window.location.href = "lista_peliculas.html";

// Cargar datos actuales
peliculaService.obtener(id).then(({ titulo, genero, duracion_min, clasificacion }) => {
  form.querySelector("[data-titulo]").value = titulo;
  form.querySelector("[data-genero]").value = genero;
  form.querySelector("[data-duracion]").value = duracion_min;
  form.querySelector("[data-clasificacion]").value = clasificacion;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    titulo:        form.querySelector("[data-titulo]").value.trim(),
    genero:        form.querySelector("[data-genero]").value.trim(),
    duracion_min:  Number(form.querySelector("[data-duracion]").value),
    clasificacion: form.querySelector("[data-clasificacion]").value,
  };

  peliculaService
    .actualizar(id, data)
    .then(() => {
      window.location.href =
        "operacion_exitosa.html?msg=Película actualizada con éxito&back=lista_peliculas.html";
    })
    .catch((err) => alert("Error: " + (err.error || err)));
});
