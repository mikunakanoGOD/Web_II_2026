//  Escribe una función que reciba un número y devuelva su versión invertida, en funcion flecha y en funcion normal

// funcion normal
const num = 12345;

let numero = num;
let invertido = 0;

while (numero > 0) {
    let digito = numero % 10;
    invertido = invertido * 10 + digito; 
    numero = Math.floor(numero / 10);
}

console.log(`el numero invertido es en funcion normal es: `);
console.log(invertido);

// funcion flecha
const invertirNumero = (num) => {
    let numero = num;
    let invertido = 0;

    while (numero > 0) {
        let digito = numero % 10;
        invertido = invertido * 10 + digito;
        numero = Math.floor(numero / 10);
    }

    return invertido;
};

console.log(`el numero invertido es en funcion flecha es: `);
console.log(invertirNumero(num));