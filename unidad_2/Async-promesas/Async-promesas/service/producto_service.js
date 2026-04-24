// ============================================================
// OPCION 1 - XAMPP (descomentar este bloque y comentar supabase)
// ============================================================
/*
const API_BASE_URL = "http://localhost/Async-promesas/api/producto.php";

const listar_productos = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener productos");
            return response.json();
        });
};

const producto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener producto");
            return response.json();
        });
};

const crearProducto = (nombre, precio) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear producto");
        return response.json();
    });
};

const actualizarProducto = (nombre, precio, id) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio, id })
    }).then(response => {
        if (!response.ok) throw new Error("Error al actualizar producto");
        return response.json();
    });
};

const eliminarProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar producto");
        return response.json();
    });
};
*/

// ============================================================
// OPCION 2 - SUPABASE (activo por defecto)
// ============================================================
const URL_SUPABASE = "https://cvlxullqviutsczcuekd.supabase.co";
const SUPABASE_KEY = "sb_publishable_0jN9VtjtbkjUIATNsAhGNA_-F0LwxzO";
const table = 'productos';
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

const request = async (url, option = {}) => {
    const res = await fetch(url, { headers: HEADERS, ...option });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
        const mensaje = data?.message ?? data?.error ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
};

// get
const listar_productos = () => {
    return request(`${API_URL}?select=id,nombre,precio`);
};

// get por id
const producto = (id) => {
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,precio`).then(data => data[0]);
};

// post
const crearProducto = (nombre, precio) => {
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({ nombre, precio })
    }).then(data => data?.[0]);
};

// patch
const actualizarProducto = (nombre, precio, id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ nombre, precio })
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo actualizar')));
};

// delete
const eliminarProducto = (id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo eliminar')));
};

export const productService = {
    listar_productos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    producto
};
