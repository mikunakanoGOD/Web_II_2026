const datos = [
    {
        'pais':'Bolivia',
        'precio':200
    },
    {
        'pais':'Brasil',
        'precio':200
    },
    {
        'pais':'Chile',
        'precio':200
    },
    {
        'pais':'Peru',
        'precio':200
    },
    {
        'pais':'Ecuador',
        'precio':200
    }
];

const presupuesto = 300;
let paisSeleccionado = "";

for(let i = 0; i < datos.length && paisSeleccionado == ""; i++){
    if(datos[i].precio <= presupuesto){
        paisSeleccionado = datos[i].pais;
    }
}

if(paisSeleccionado != "")
    console.log(`no existe pasajes disponibles`);
else
    console.log(`puedes comprar el pasaje a ${paisSeleccionado}`);