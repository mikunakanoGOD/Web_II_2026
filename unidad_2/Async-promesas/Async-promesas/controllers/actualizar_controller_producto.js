import { productService } from "../service/producto_service.js";
const formulario = document.querySelector("[data-form]");
const obInfo = async()=>{
    const url = new URL(window.location);
    const id = (url.searchParams.get("id"))
    if(id==null){
        window.location.href="../screens/error.html"
    }
    const nombre = document.querySelector("[data-nombre]")
    const precio = document.querySelector("[data-email]")
    try{
        const product = await productService.producto(id);
        if(product.nombre && product.precio){
            nombre.value = product.nombre;
            precio.value = product.precio;
        }else{
            throw new Error();
        }
    }catch(error){
        window.location.href="../screens/error.html"
    }
};
obInfo();

formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-email]").value;
    productService.actualizarProducto(nombre,precio,id).then(()=>{
        window.location.href="../screens/edicion_concluida_productos.html";
    });
});