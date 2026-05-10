import { productService } from "../service/producto_service.js";
const crearfila = (nombre, precio,id) =>{
    const fila = document.createElement('tr');//creamosnueva fila
    //html como variable
    const contenido = `
    <td class="td" data-td>
        ${nombre}
    </td>
    <td>${precio}</td>
    <td>
        <ul class="table__button-control">
        <li>
            <a
            href="../screens/editar_producto.html?id=${id}"
            class="simple-button simple-button--edit"
            >
            Editar
            </a>
        </li>
        <li>
            <button class="simple-button simple-button--delete" type="button" id="${id}">
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
        productService.eliminarProducto(id).then(respuesta=>{
            alert("eliminado");
            window.location.reload();
        }).catch(error=>console.log("error"));
    });
    return fila;
};

const table = document.querySelector("[data-table]");
productService
.listar_productos()
    .then((data)=>{
        data.forEach(({nombre, precio,id}) => {
            const nuevaFila=crearfila(nombre, precio, id)
            table.appendChild(nuevaFila)
        });
}).catch((error)=>alert("error"));
