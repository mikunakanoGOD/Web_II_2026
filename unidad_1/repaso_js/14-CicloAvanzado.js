const datos = [
    {
        'pais': 'Bolivia',
        'precio': 500
    },
    {
        'pais': 'Ecuador',
        'precio': 600
    },
    {
        'pais': 'Brasil',
        'precio': 700
    },
    {
        'pais': 'Venezuela',
        'precio': 100
    },
    {
        'pais': 'Paraguay',
        'precio': 200
    }
]

const presupuesto = 300;
let i = 0;

let PaisSeleccionado = '';

do{
    if(datos[i].precio <= presupuesto){
        PaisSeleccionado = datos[i].pais;
    }
    i++;
}while(i < datos.length && PaisSeleccionado == '');

if(PaisSeleccionado == ''){
    console.log('No existen pasajes disponibles');
}else{
    console.log(`Puedes comprar pasaje`);
}