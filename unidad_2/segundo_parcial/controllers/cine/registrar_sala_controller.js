import { salaService } from "../../service/cine/cine-service.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    nombre:    form.querySelector("[data-nombre]").value.trim(),
    capacidad: Number(form.querySelector("[data-capacidad]").value),
    tipo:      form.querySelector("[data-tipo]").value,
  };

  salaService
    .crear(data)
    .then(() => {
      window.location.href =
        "operacion_exitosa.html?msg=Sala registrada con éxito&back=lista_salas.html";
    })
    .catch((err) => alert("Error: " + (err.error || err)));
});
