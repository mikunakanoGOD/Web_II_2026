const PaisesDisponibles = ["Bolivia", "Ecuador", "Brasil", "Venezuela", "Italia", "Francia"];
const PrecioPaises = new Array(100, 200, 300, 400, 500, 600);
const presupuesto = 250;

let i = 0;

while(PrecioPaises[i]>presupuesto && i < PrecioPaises.length){
    i++
}

if(i==PaisesDisponibles.length){
    console.log("nno existe pasaje");
}else{
    console.log(`puedes comprar el pasaje`);
}
