import { productoServices } from "../service/productos-service.js";
const crearFila = (nombre, precio, descripcion, id) => {

    const fila = document.createElement("tr");

    const contenido = `
    
        <td class="td" data-td>
            ${nombre}
        </td>

        <td>
            ${precio}
        </td>

        <td>
            ${descripcion}
        </td>

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
                    <button
                        class="simple-button simple-button--delete"
                        type="button"
                        id="${id}"
                    >
                        Eliminar
                    </button>
                </li>

            </ul>
        </td>

    `;

    fila.innerHTML = contenido;
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        productoServices.eliminarProducto(id)
            .then(() => {
                alert("Producto eliminado");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                alert("Ocurrió un error");
            });
    });
    return fila;

};

const table = document.querySelector("[data-table]");
productoServices
    .listarProductos()
    .then((data) => {

        data.forEach(({ nombre, precio, descripcion, id }) => {

            const nuevaFila = crearFila(
                nombre,
                precio,
                descripcion,
                id
            );

            table.appendChild(nuevaFila);

        });

    })
    .catch((error) => {

        console.log(error);

        alert("Error al cargar productos");

    });