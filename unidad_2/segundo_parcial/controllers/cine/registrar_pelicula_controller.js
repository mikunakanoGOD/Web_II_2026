import { peliculaService } from "../../service/cine/cine-service.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    titulo:        form.querySelector("[data-titulo]").value.trim(),
    genero:        form.querySelector("[data-genero]").value.trim(),
    duracion_min:  Number(form.querySelector("[data-duracion]").value),
    clasificacion: form.querySelector("[data-clasificacion]").value,
  };

  peliculaService
    .crear(data)
    .then(() => {
      window.location.href =
        "operacion_exitosa.html?msg=Película registrada con éxito&back=lista_peliculas.html";
    })
    .catch((err) => alert("Error: " + (err.error || err)));
});
