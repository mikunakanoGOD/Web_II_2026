const ciudades = new Array ("Sucre", "La Paz","Santa Cruz", "Beni", "Pando", "Oruro");

//definir un array abreviado
const paises = ["Bolivia", "Ecuador", "Brasil", "Italia"];

let conteoCiudades = ciudades.length // contar tamaño array
// se lo pued eimprimir dentro de un log
console.log (`el conteo total de ciudades es ${conteoCiudades}`);

//Ejercicios 
//eliminar elementos
ciudades.shift(); // elimina el primer elemento
console.log(ciudades);
ciudades.pop() // elimina el ultimo elemento
console.log(ciudades);

console.log(paises.join("-")) // unifica los elementos con en una cadena de caracteres
console.log(paises.sort()); //ordena los paises