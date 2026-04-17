import { productService } from "../service/producto_service.js";
const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-email]").value;
    productService.crearProducto(nombre,precio).then((respuesta)=>{
        console.log("todo ok", respuesta);
        window.location.href="../screens/registro_producto_completado.html";
    }).catch((error)=>{
        console.log("todo mal", error);
    });
});