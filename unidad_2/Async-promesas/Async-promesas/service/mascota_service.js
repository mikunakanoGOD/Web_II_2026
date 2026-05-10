const API_BASE_URL = "http://localhost/Async-promesas/api/mascota.php";

// get todos
const listar_mascotas = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener mascotas");
            return response.json();
        });
};

// get por id
const mascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener mascota");
            return response.json();
        });
};

// post
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

// put
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

// delete
const eliminarMascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar mascota");
        return response.json();
    });
};

export const mascotaService = {
    listar_mascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota,
    mascota
};
