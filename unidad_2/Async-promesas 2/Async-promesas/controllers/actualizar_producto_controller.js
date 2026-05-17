import { productoServices } from "../service/productos-service.js";

const obtenerInformacion = async () => {

    const url = new URL(window.location);

    const id = url.searchParams.get("id");
    const inputNombre = document.querySelector("[data-nombre]");
    const inputPrecio = document.querySelector("[data-precio]");
    const inputDescripcion = document.querySelector("[data-descripcion]");

    try {
        const producto = await productoServices.producto(id);
        inputNombre.value = producto.nombre;
        inputPrecio.value = producto.precio;
        inputDescripcion.value = producto.descripcion;

    } catch (error) {

        console.log(error);

        alert("Ocurrió un error al cargar el producto");

    }

};

obtenerInformacion();
const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    try {
        await productoServices.actualizarProducto(
            id,
            nombre,
            precio,
            descripcion
        );

        alert("Producto actualizado correctamente");
        window.location.href = "../screens/lista_producto.html";

    } catch (error) {

        console.log(error);

        alert("Ocurrió un error al actualizar el producto");

    }

});