import { salaService } from "../../service/cine/cine-service.js";

const tbody = document.querySelector("[data-table]");
const modalContainer = document.querySelector(".modal-container");
const btnConfirm = document.querySelector(".modal__button--confirm");
const btnCancel = document.querySelectorAll(".modal__button:not(.modal__button--confirm)");
const btnClose = document.querySelector(".modal__close");

let idAEliminar = null;

const renderTabla = (salas) => {
  tbody.innerHTML = "";
  salas.forEach(({ id, nombre, capacidad, tipo }) => {
    tbody.innerHTML += `
      <tr>
        <td>${nombre}</td>
        <td>${capacidad}</td>
        <td>${tipo}</td>
        <td class="table__align--right">
          <a href="editar_sala.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
          <button class="simple-button simple-button--delete" data-id="${id}">Eliminar</button>
        </td>
      </tr>`;
  });

  tbody.querySelectorAll("[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      idAEliminar = btn.dataset.id;
      modalContainer.classList.remove("modal--close");
    });
  });
};

const cerrarModal = () => modalContainer.classList.add("modal--close");
btnClose.addEventListener("click", cerrarModal);
btnCancel.forEach((b) => b.addEventListener("click", cerrarModal));

btnConfirm.addEventListener("click", () => {
  salaService
    .eliminar(idAEliminar)
    .then(() => { cerrarModal(); cargar(); })
    .catch((err) => alert("Error al eliminar: " + (err.error || err)));
});

const cargar = () => {
  salaService.listar().then(renderTabla).catch(() => alert("No se pudo conectar con el servidor."));
};

cargar();
