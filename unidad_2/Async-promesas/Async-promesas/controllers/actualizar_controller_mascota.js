import { mascotaService } from "../service/mascota_service.js";
const formulario = document.querySelector("[data-form]");
const obInfo = async()=>{
    const url = new URL(window.location);
    const id = (url.searchParams.get("id"))
    if(id==null){
        window.location.href="../screens/error.html"
    }
    const nombre = document.querySelector("[data-nombre]")
    const raza = document.querySelector("[data-raza]")
    const edad = document.querySelector("[data-edad]")
    const peso = document.querySelector("[data-peso]")
    const idDueno = document.querySelector("[data-iddueno]")
    try{
        const perfil = await mascotaService.mascota(id);
        if(perfil.nombre && perfil.raza){
            nombre.value = perfil.nombre;
            raza.value = perfil.raza;
            edad.value = perfil.edad;
            peso.value = perfil.peso;
            idDueno.value = perfil["id-dueño"];
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
    const raza = document.querySelector("[data-raza]").value;
    const edad = document.querySelector("[data-edad]").value;
    const peso = document.querySelector("[data-peso]").value;
    const idDueno = document.querySelector("[data-iddueno]").value;
    mascotaService.actualizarMascota(nombre, raza, edad, peso, idDueno, id).then(()=>{
        window.location.href="../screens/edicion_concluida_mascotas.html";
    });
})
