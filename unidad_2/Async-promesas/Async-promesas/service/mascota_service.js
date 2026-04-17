const listar_mascotas = () => fetch('http://localhost:3000/Mascotas').then((response) => response.json()).catch((err)=>console.log('el error aqui',err));

const crearMascota = (nombre, raza, edad, peso, idDueno) => {
    return fetch('http://localhost:3000/Mascotas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, raza, edad, peso, "id-dueño": idDueno, id: uuid.v4() })
    });
}

const actualizarMascota = (nombre, raza, edad, peso, idDueno, id) => {
    return fetch(`http://localhost:3000/Mascotas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, raza, edad, peso, "id-dueño": idDueno })
    })
    .then(respuesta=>console.log(respuesta)).catch(error=>console.log(error));
};

const eliminarMascota = (id) => {
    console.log("eliminar mascota con id: ", id);
    return fetch(`http://localhost:3000/Mascotas/${id}`, {
        method: 'DELETE'
    }).catch(error=>alert("error aqui"));
};

const mascota = (id) => {
    return fetch(`http://localhost:3000/Mascotas/${id}`).then((response)=>response.json())
    .catch((error)=>console.log(error));
}

export const mascotaService = {
    listar_mascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota,
    mascota
};