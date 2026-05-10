import { mascotaService } from "../service/mascota_service.js";
const crearfila = (nombre, raza, edad, peso, idDueno, id) =>{
    const fila = document.createElement('tr');
    const contenido = `
    <td class="td" data-td>
        ${nombre}
    </td>
    <td>${raza}</td>
    <td>${edad}</td>
    <td>${peso}</td>
    <td>${idDueno}</td>
    <td>
        <ul class="table__button-control">
        <li>
            <a
            href="../screens/editar_mascota.html?id=${id_mascota}"
            class="simple-button simple-button--edit"
            >
            Editar
            </a>
        </li>
        <li>
            <button class="simple-button simple-button--delete" type="button" id="${id_mascota}">
            Eliminar
            </button>
        </li>
        </ul>
    </td>
    `;
    fila.innerHTML=contenido;

    const btn = fila.querySelector("button");
    btn.addEventListener("click",()=>{
        const id=btn.id;
        mascotaService.eliminarMascota(id).then(respuesta=>{
            alert("eliminado");
            window.location.reload();
        }).catch(error=>console.log("error"));
    });
    return fila;
};

const table = document.querySelector("[data-table]");
mascotaService
.listar_mascotas()
    .then((data)=>{
        data.forEach(({nombre, raza, edad, peso, id: idDueno, id_mascota}) => {
            const nuevaFila=crearfila(nombre, raza, edad, peso, idDueno, id_mascota)
            table.appendChild(nuevaFila)
        });
}).catch((error)=>alert("error"));
