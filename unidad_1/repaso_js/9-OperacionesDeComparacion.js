const ValorPasaje = 1000;
if(ValorPasaje === 1000){
    console.log("El valor del pasaje es correcto");
}

const PaisDestino = "Ecuador";
const PaisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];

let EdadPasajero = 17;
let acompañado = true;

console.log(`Pasajes para ${PaisDestino}`);
if(PaisesDisponibles.indexOf(PaisDestino) > -1 && (EdadPasajero >= 18) || acompañado){
    console.log("pasaje disponible para venta");
}else{
    console.log("no se puede vender el pasaje");
}

if(!PaisesDisponibles.indexOf(PaisDestino) > -1 && (EdadPasajero >= 18) || acompañado){
    console.log("no se puede vender el pasaje");
}else{
    console.log("pasaje disponible para venta");
}