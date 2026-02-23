const datos = [
    { pais: 'Bolivia', precio: 200 },
    { pais: 'Brasil', precio: 200 },
    { pais: 'Chile', precio: 200 },
    { pais: 'Peru', precio: 200 },
    { pais: 'Ecuador', precio: 200 }
];

const presupuesto = 300;

const seleccionarPais = (datos, presupuesto) => {
    const encontrado = datos.find(dato => dato.precio <= presupuesto);
    return encontrado ? encontrado.pais : "";
};

const paisSeleccionado = seleccionarPais(datos, presupuesto);

if (paisSeleccionado != "")
    console.log(`puedes comprar el pasaje`);
else
    console.log(`no existe pasajes disponibles`);