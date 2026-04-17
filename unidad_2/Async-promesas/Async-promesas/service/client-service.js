//recepcion de datos
/*const CrearFila = (nombre, email) => {
    const fila = document.createElement('tr');
    //html como variable
    const contenido = `
    <td class="td" data-td>
    ${nombre}
    </td>
    <td>${email}</td>
    <td>
    <ul class="table__button-control">
        <li>
        
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
    fila.innerHTML = contenido;
    return fila;        
}*/

/*const table = document.querySelector('[data-table]');

const listar_clientes = () => {
    const promesa = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/perfil');
        http.send();
        http.onload = () => {
            const response = JSON.parse(http.response);
            if (http.response >= 400) {
                reject(response);
            } else {
                resolve(response);
            }
        }
    });
    return promesa;
};

listar_clientes().then((data) => {
    data.forEach((perfil) => {
        const nuevaFila = CrearFila(perfil.nombre, perfil.email);
        table.appendChild(nuevaFila);
    });
})
.catch((error) => alert("sin conexion"));*/

const listar_clientes = () => fetch('http://localhost:3000/perfil').then((response) => response.json()).catch((err)=>console.log('el error aqui',err));

const crearCliente = (nombre, email) => {
    return fetch('http://localhost:3000/perfil', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, id: uuid.v4() })
    });
}

const actualizarCliente = (nombre, email, id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email })
    })
    .then(respuesta=>console.log(respuesta)).catch(error=>console.log(error));
};

const eliminarCliente = (id) => {
    console.log("eliminar cliente con id: ", id);
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: 'DELETE'
    }).catch(error=>alert("error aqui"));
};

//REFERECINA A ID
const cliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`).then((response)=>response.json())
    .catch((error)=>console.log(error));
}

export const clientService = {
    listar_clientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    cliente
};