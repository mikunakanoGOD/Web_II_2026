const paisDestino = "Francia";
const paisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Italia", "Francia"];

//variables que se identifican segun el contenido para saber si es un bool, caracter, numerico
let edadPasajero = 17;
let acompaniado = false;
let pasaporte= true;
let casado= false;

console.log(`verificamos si hay pasajes para ${paisDestino}`);

// A && B || C
if(paisesDisponibles.indexOf(paisDestino) > -1 && 
edadPasajero >=18 && 
pasaporte && 
!casado){
    console.log(`disponible tour solteros`)
}
else{
    console.log(`Pais no disponible o pasajero no cumple con los requisitos`)
}