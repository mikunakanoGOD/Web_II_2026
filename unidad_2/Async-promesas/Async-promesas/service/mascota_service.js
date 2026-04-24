// ============================================================
// OPCION 1 - XAMPP (descomentar este bloque y comentar supabase)
// ============================================================
/*
const API_BASE_URL = "http://localhost/Async-promesas/api/mascota.php";

const listar_mascotas = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener mascotas");
            return response.json();
        });
};

const mascota = (id_mascota) => {
    return fetch(`${API_BASE_URL}?id_mascota=${id_mascota}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener mascota");
            return response.json();
        });
};

const crearMascota = (nombre, raza, edad, peso, idDueno) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, raza, edad, peso, id: idDueno })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear mascota");
        return response.json();
    });
};

const actualizarMascota = (nombre, raza, edad, peso, idDueno, id_mascota) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, raza, edad, peso, id: idDueno, id_mascota })
    }).then(response => {
        if (!response.ok) throw new Error("Error al actualizar mascota");
        return response.json();
    });
};

const eliminarMascota = (id_mascota) => {
    return fetch(`${API_BASE_URL}?id_mascota=${id_mascota}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar mascota");
        return response.json();
    });
};
*/

const URL_SUPABASE = "https://cvlxullqviutsczcuekd.supabase.co";
const SUPABASE_KEY = "sb_publishable_0jN9VtjtbkjUIATNsAhGNA_-F0LwxzO";
const table = 'mascotas';
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
const listar_mascotas = () => {
    return request(`${API_URL}?select=id_mascota,nombre,raza,edad,peso,id`);
};

// get por id
const mascota = (id_mascota) => {
    return request(`${API_URL}?id_mascota=eq.${id_mascota}&select=id_mascota,nombre,raza,edad,peso,id`).then(data => data[0]);
};

// post
const crearMascota = (nombre, raza, edad, peso, idDueno) => {
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({ nombre, raza, edad, peso, id: idDueno })
    }).then(data => data?.[0]);
};

// patch
const actualizarMascota = (nombre, raza, edad, peso, idDueno, id_mascota) => {
    return request(`${API_URL}?id_mascota=eq.${id_mascota}`, {
        method: 'PATCH',
        body: JSON.stringify({ nombre, raza, edad, peso, id: idDueno })
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo actualizar')));
};

// delete
const eliminarMascota = (id_mascota) => {
    return request(`${API_URL}?id_mascota=eq.${id_mascota}`, {
        method: 'DELETE'
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo eliminar')));
};

export const mascotaService = {
    listar_mascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota,
    mascota
};
