const API_BASE_URL = 'http://127.0.0.1/api1/mascotas.php';

// LISTAR MASCOTAS
const listarMascotas = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener mascotas');
            return response.json();
        });
};

// CREAR MASCOTA
const crearMascota = (nombre, edad, descripcion) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            edad,
            descripcion
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al crear mascota');
        return response.json();
    });
};

// ELIMINAR MASCOTA
const eliminarMascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al eliminar mascota');
        return response.json();
    });
};

// ACTUALIZAR MASCOTA
const actualizarMascota = (id, nombre, edad, descripcion) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            nombre,
            edad,
            descripcion
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al actualizar mascota');
        return response.json();
    });
};

// OBTENER UNA MASCOTA
const mascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Mascota no encontrada');
            return response.json();
        });
};

// EXPORTAR FUNCIONES
export const mascotaServices = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    actualizarMascota,
    mascota
};