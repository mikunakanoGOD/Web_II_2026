const PaisDestino = "Ecuador";
const PaisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];

let EdadPasajero = 17;
let acompañado = true;

console.log(`Pasajes para ${PaisDestino}`);
if(PaisesDisponibles.indexOf(PaisDestino) > -1) {
    console.log("pasaje disponible para venta");
    if (EdadPasajero >= 18 || acompañado) {
        console.log("pasaje disponible para venta");
    }else{
        console.log("no se puede vender el pasaje a menores de edad sin estar acompañados");
    }
}else{
    console.log("no se puede vender el pasaje");
}
