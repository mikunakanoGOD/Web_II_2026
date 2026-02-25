//devuelve los que son primos

//funcion normal
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function esPrimo(numero) {
    if (numero <= 1) return false;

    for (let i = 2; i < numero; i++) {
    if (numero % i === 0) return false;
    }

    return true;
}

console.log(`usando la funcion normal:`);
let primos = numeros.filter(esPrimo);
console.log(primos);

//funcion flecha
const esPrimof = (numero) => {
    if (numero <= 1) return false;

    for (let i = 2; i < numero; i++) {
    if (numero % i === 0) return false;
    }

    return true;
};

console.log(`usando la funcion flecha:`);
console.log(primos);