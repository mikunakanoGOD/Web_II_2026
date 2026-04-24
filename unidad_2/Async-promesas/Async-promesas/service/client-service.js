//recepcion de datos
/*const API_BASE_URL = http://localhost/api/conexion.php;
const listar_clientes = () => {
    return fetch(API_BASE_URL).then((response) => {
        if (!response.ok) throw new Error("Error al obtener los clientes");
        return response.json();
    });
};

const crearCliente = (nombre, email) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email })
    }).then((response) => {
        if (!response.ok) throw new Error("Error al crear el cliente");
        return response.json();
    });
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email, id })
    }).then((response) => {
        if (!response.ok) throw new Error("Error al actualizar el cliente");
        return response.json();
    });
};

const eliminarCliente = (id) => {
    return fetch(${API_BASE_URL}?id=${id}, {
        method: "DELETE"
    }).then((response) => {
        if (!response.ok) throw new Error("Error al eliminar el cliente");
        return response.json();
    });
};

const cliente = (id) => {
    return fetch(${API_BASE_URL}?id=${id})
        .then((response) => response.json());
};*/

//con supabase

const URL_SUPABASE = "https://cvlxullqviutsczcuekd.supabase.co";
const SUPABASE_KEY = "sb_publishable_0jN9VtjtbkjUIATNsAhGNA_-F0LwxzO"
const table='clientes';
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`

const HEADERS={
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation' 
};

//respuesta que evita que usemos fetch en cada funcion
//conexcion y gestion de errores

const request = async(url,option ={})=>{
    const res = await fetch(url,{headers: HEADERS, ...option});
    const text = await res.text();
    const data = text ? JSON.parse(text):null;
    //verificacion de error
    if(!res.ok){
        const mensaje = data?.message ?? data?.error ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
};

//get
const listar_clientes = () => {
    return request(`${API_URL}?select=id,nombre,email`);
};

//get por id
const cliente = (id)=>{
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,email`).then(data=>data[0]);
}

//post
const crearCliente = (nombre,email) => {
    return request(API_URL,{
        method: 'POST',
        body: JSON.stringify({nombre,email})
    }).then(data=>data?.[0]);
}

//patch
const actualizarCliente=(nombre,email,id)=>{
    return request(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        body:JSON.stringify({nombre,email})
    }).then(data=>data?.[0] ?? Promise.reject(new Error('no se pudo actualizar')));
}

//delete
const eliminarCliente = (id) =>{
    return request(`${API_URL}?id=eq.${id}`,{
        method:'DELETE'
    }).then(data=>data?.[0] ?? Promise.reject(new Error('no se pudo eliminar')));
}

export const clientService = {
    listar_clientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    cliente
};