const PaisDestino = "Ecuador";
const PaisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];
let ValorPasaje = 0;

switch(PaisDestino){
    case "Bolivia":
        ValorPasaje = 500;
        break;
    case "Ecuador":
        ValorPasaje = 100;
        break;
    case "Brasil":
        ValorPasaje = 300;
        break;
    case "Venezuela":
        ValorPasaje = 800;
        break;
    case "Italia":
        ValorPasaje = 1500;
        break;
    case "Francia":
        ValorPasaje = 2000;
        break;
    default:
        console.log("No existen pasajes para esa ciudad");
        break
}

if(ValorPasaje > 0){
    console.log(`El valor del pasaje es ${ValorPasaje}`);
}