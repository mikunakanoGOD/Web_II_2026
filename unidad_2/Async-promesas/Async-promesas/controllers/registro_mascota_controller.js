import { mascotaService } from "../service/mascota_service.js";
const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const raza = document.querySelector("[data-raza]").value;
    const edad = document.querySelector("[data-edad]").value;
    const peso = document.querySelector("[data-peso]").value;
    const idDueno = document.querySelector("[data-iddueno]").value;
    mascotaService.crearMascota(nombre, raza, edad, peso, idDueno).then((respuesta)=>{
        console.log("todo ok", respuesta);
        window.location.href="../screens/registro_mascota_concluido.html";
    }).catch((error)=>{
        console.log("todo mal", error);
    });
});
