import { productoServices } from "../service/productos-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    try {

        await productoServices.crearProducto(
            nombre,
            precio,
            descripcion
        );

        window.location.href = "../screens/registro_completado.html";

    } catch (error) {

        console.log(error);

        alert("Ocurrió un error al registrar el producto");

    }

});