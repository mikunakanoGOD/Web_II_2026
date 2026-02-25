//convertir un numero decimal a binario

//funcion normal
function decimalBinario(numero) {
    let binario = "";

    while (numero > 0) {
        binario = (numero % 2) + binario;
        numero = Math.floor(numero / 2);
    }

    return binario;
}

console.log(`usando la funcion normal:`);
console.log(decimalBinario(10));

//funcion flecha
const decimalBinario = (numero) => {
    let binario = "";

    while (numero > 0) {
        binario = (numero % 2) + binario;
        numero = Math.floor(numero / 2);
    }

    return binario;
};

console.log(`usando la funcion flecha:`);
console.log(decimalBinario(10));