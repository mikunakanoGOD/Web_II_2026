//recepcion de datos
/*const crearfila = (nombre, email) =>{
    const fila = document.createElement('tr');//creamosnueva fila
    //html como variable
    const contenido = `
    <td class="td" data-td>
        ${nombre}
    </td>
    <td>${email}</td>
    <td>
        <ul class="table__button-control">
        <li>
            <a
            href="../screens/editar_cliente.html"
            class="simple-button simple-button--edit"
            >
            Editar
            </a>
        </li>
        <li>
            <button class="simple-button simple-button--delete" type="button">
            Eliminar
            </button>
        </li>
        </ul>
    </td>
    `;
    fila.innerHTML=contenido;
    return fila;
}*/


/*const listar_clientes = () =>{
    const promesa = new Promise((resolve, reject) =>{
        const http = new XMLHttpRequest();//variable para request con http
        http.open("GET", "http://localhost:3000/perfil");
        http.send();
        http.onload = () =>{
            const response = JSON.parse(http.response)
            if(http.response >= 400){
                reject(response);
            }else
                resolve(response);
        }
    })
    return promesa;
}
listar_clientes()
    .then((data)=>{
        data.forEach((perfil)=>{
            const nuevafila = crearfila(perfil.nombre, perfil.email);
            table.appendChild(nuevafila);
        });
})
    .catch((error)=>alert("sin conexcion"));*/
    //--optimizado--//
    const listar_clientes=()=>fetch("http://localhost:3000/perfil").then((respuesta)=>respuesta.json());

const crearCliente=(nombre, email) =>{
    return fetch("http://localhost:3000/perfil",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({nombre, email, id: uuid.v4()})
    });
};

const ActualizarCliente=(nombre, email, id)=>{ //SOLO MODIFICO EL NOMBRE Y EL EMAIL
    return fetch(`http://localhost:3000/perfil/${id}`, 
        {
        method: "PUT",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({nombre,email})
        })
        .then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
}

const eliminarCliente=(id)=>{
    console.log("eliminar",id);
    return fetch(`http://localhost:3000/perfil/${id}`,
        {
            method:"DELETE"
        });
};
//referencia a identificador
const cliente=(id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta)=>respuesta.json());
}

export const clientService={
    listar_clientes,
    crearCliente,
    ActualizarCliente,
    eliminarCliente,
    cliente
};