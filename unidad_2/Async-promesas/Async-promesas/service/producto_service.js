const API_BASE_URL = "http://localhost/Async-promesas/api/producto.php";

// get todos
const listar_productos = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener productos");
            return response.json();
        });
};

// get por id
const producto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener producto");
            return response.json();
        });
};

// post
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

// put
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

// delete
const eliminarProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar producto");
        return response.json();
    });
};

export const productService = {
    listar_productos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    producto
};
