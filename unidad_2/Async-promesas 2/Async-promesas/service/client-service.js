// recepcion de datos 
/*const crearFila =(nombre,email)=>{
    const fila=document.createElement('tr');//creamos nueva fila
    //html como variable 
    const contenido=`
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
//const table = document.querySelector("[data-table]");
/*

const listar_clientes=()=>{ //metodo antiguo
    const promesa= new Promise((resolve,reject)=>{
        const http = new XMLHttpRequest();//variable con request http y xml
        http.open("GET","http://localhost:3000/perfil");
        http.send();
        http.onload=()=>{
            const response = JSON.parse(http.response);//convierto que mi respuesta hhtp sea json
            if(http.response>=400){
                reject(response)
            } else{
                resolve(response)
            }
        };
    });
    return promesa;
}
listar_clientes()
    .then((data)=>{
        data.forEach((perfil)=>{
            const nuevafila= crearFila(perfil.nombre,perfil.email);
            table.appendChild(nuevafila)
        });
    })
    .catch((error)=> alert("No existe conexión"));

*/


    //------- optimizado---------//
/*
const listar_clientes=()=>fetch("http://localhost:3000/perfil").then((respuesta)=>respuesta.json());

const crearCliente=(nombre,email)=>{
    return fetch("http://localhost:3000/perfil",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({nombre,email, id:uuid.v4()})
    });


};

const actualizarCliente=(nombre,email,id)=>{ // SOLO MODIFICO EL NOMBRE Y EL EMAIL
    return fetch(`http://localhost:3000/perfil/${id}`,
    {
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({nombre,email}) 
    })
        .then(respuesta=>console.log(respuesta)).catch((err)=>console.log("error aqui",err));  

};
const eliminarCliente=(id)=>{
    console.log("eliminar",id);
    return fetch(`http://localhost:3000/perfil/${id}`,{
        method:"DELETE"
    });
};
// REFERENCIA A ID
const cliente=(id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`)
    .then((respuesta)=>respuesta.json())
    .catch((err)=>console.log('error aqui',err));
}
*/
//--------con mysql--------//

const API_BASE_URL='http://127.0.0.1/api1/conexion.php';

const listaclientes=()=>{
    return fetch(API_BASE_URL).then(response=>{
        if(!response.ok)throw new Error('error clientes');
        return response.json();
    });
};
const crearCliente=(nombre,email)=>{
    return fetch(API_BASE_URL,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({nombre,email, id:uuid.v4()})
    }).then(response=>{
        if(!response.ok)throw new Error('error clientes');
        return response.json();
    })
};
const eliminarCliente=(id)=>{
    return fetch(`${API_BASE_URL}?id=${id}`,{
        method:"DELETE"
    });
     //.then((respuesta)=>respuesta.json())
};
const actualizarCliente=(nombre,email,id)=>{
    return fetch(API_BASE_URL,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({nombre,email,id})
    }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));

};
const cliente =(id)=>{
    return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta)=>respuesta.json());
}

export const clientService  ={
    listaclientes,
    crearCliente,
    eliminarCliente,
    actualizarCliente,
    cliente
}
/*

//----CON SUPABASE----//
const URL_SUPABASE='https://zynfpfdcthndtdfsoqzn.supabase.co';
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5bmZwZmRjdGhuZHRkZnNvcXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MjgzMTgsImV4cCI6MjA5MjIwNDMxOH0.aq0KMQsgjSVaiSO6u5bw81dGumijVPEoVAS6ublda54';
const table= 'clientes';
const API_URL=`${URL_SUPABASE}/rest/v1/${table}`

const HEADERS={
    'apikey': SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json',
    'Prefer':'return=representation'
};
//respuesta que evita que usemos fetch en cada funcion
//conexion y gestion de errores 
const request = async (url, options = {}) => {
    const res  = await fetch(url, { headers: HEADERS, ...options });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const mensaje = data?.message ?? data?.error ?? text ?? 'Error desconocido';
        throw new Error(mensaje);
    }

    return data;
};

///// ------------------------//////
//get

const listaclientes = () =>
    request(`${API_URL}?select=id,nombre,email`);

//get por id
const cliente=(id)=>{
    request(`${API_URL}?id=eq.${id}&select=id,nombre,email`)
    .then(data=>data?.[0] ?? Promise.reject(new Error ('no se pudede')))
}

//post
const crearCliente=(nombre,email)=>{
    request(API_URL,{
        method:'POST',
        body: JSON.stringify({nombre,email})
    }).then(data=>data?.[0]);
}

//patch
const actualizarCliente =(id,nombre,email)=>
    request(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        body:JSON.stringify({nombre,email})
    }).then(data=>data?.[0] ?? Promise.reject(new Error ('no se pudo actualizar')));

// delete
const eliminarCliente=(id)=>
    request(`${API_URL}?id=eq.${id}`,{
        method:'DELETE',
    }).then(data=>data?.[0] ?? Promise.reject(new Error ('no se pudo eliminar')))

*/
/*

const BASE_URL="http://localhost:3000";
const clientService={
    //get
    listaclientes: async()=>{
        const res = await fetch(`${BASE_URL}/clientes`);
        return res.json();
    },
    // get por id
    cliente: async(id)=>{
        const res= await fetch(`${BASE_URL}/cliente/${id}`);
    },
    // post
    crearCliente:async(id,nombre,email)=>{
        const res = await fetch(`${BASE_URL}/clientes`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id,nombre,email})
        });
        return res.json();
    },
    // put
    actualizarCliente:async (nombre,email,id)=>{
        const res = await fetch(`${BASE_URL}/clientes/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({nombre,email})
        });
        return res.json();
    },
    // delete
    eliminarCliente:async(id)=>{
        const res= await fetch(`${BASE_URL}/clientes/${id}`,{
            method:"DELETE"
        });
        return res.json();
    }
};
export{clientService};

*/
/*
const BASE_URL = "http://localhost:3000"; // ← tu puerto del servidor

const clientService = {
    // GET todos los clientes
    listaclientes: async () => {
        const res = await fetch(`${BASE_URL}/clientes`);
        return res.json();
    },

    // GET cliente por id
    cliente: async (id) => {
        const res = await fetch(`${BASE_URL}/cliente/${id}`);
        return res.json();
    },

    // POST crear cliente
    crearCliente: async (id, nombre, email) => {
        const res = await fetch(`${BASE_URL}/clientes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, nombre, email })
        });
        return res.json();
    },

    // PUT actualizar cliente
    actualizarCliente: async (nombre, email, id) => {
        const res = await fetch(`${BASE_URL}/clientes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email })
        });
        return res.json();
    },

    // DELETE eliminar cliente
    eliminarCliente: async (id) => {
        const res = await fetch(`${BASE_URL}/clientes/${id}`, {
            method: "DELETE"
        });
        return res.json();
    }
};

export { clientService }; */