const API_BASE_URL = 'http://127.0.0.1/api1/productos.php';

// LISTAR PRODUCTOS
const listarProductos = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener productos');
            return response.json();
        });
};

// CREAR PRODUCTO
const crearProducto = (nombre, precio, descripcion) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: uuid.v4(),
            nombre,
            precio,
            descripcion
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al crear producto');
        return response.json();
    });
};

// ELIMINAR PRODUCTO
const eliminarProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al eliminar producto');
        return response.json();
    });
};

// ACTUALIZAR PRODUCTO
const actualizarProducto = (id, nombre, precio, descripcion) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            nombre,
            precio,
            descripcion
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al actualizar producto');
        return response.json();
    });
};

// OBTENER UN PRODUCTO
const producto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Producto no encontrado');
            return response.json();
        });
};

// EXPORTAR SERVICIOS
export const productoServices = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    actualizarProducto,
    producto
};