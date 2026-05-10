const API_BASE_URL = "http://localhost/Async-promesas/api/conexion.php";

// get todos
const listar_clientes = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener clientes");
            return response.json();
        });
};

// get por id
const cliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener cliente");
            return response.json();
        });
};

// post
const crearCliente = (nombre, email) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear cliente");
        return response.json();
    });
};

// put
const actualizarCliente = (nombre, email, id) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, id })
    }).then(response => {
        if (!response.ok) throw new Error("Error al actualizar cliente");
        return response.json();
    });
};

// delete
const eliminarCliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar cliente");
        return response.json();
    });
};

export const clientService = {
    listar_clientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    cliente
};
