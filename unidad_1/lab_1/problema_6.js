//encontrar el numero que mas se repite en un array

//funcion normal
let numeros = [1, 2, 2, 3, 4, 2, 5, 3, 3];

function numeroMasRepetido(array) {
    let contador = {};
    let maxRepeticiones = 0;
    let numeroMasFrecuente = null;

    for (let i = 0; i < array.length; i++) {
        let numero = array[i];

        if (!contador[numero]) {
            contador[numero] = 0;
        }

        contador[numero]++;

        //verificacion de si es el numero mas repetido
        if (contador[numero] > maxRepeticiones) {
            maxRepeticiones = contador[numero];
            numeroMasFrecuente = numero;
        }
    }

    return numeroMasFrecuente;
}

console.log(`usando la funcion normal:`);
console.log(numeroMasRepetido(numeros));

//funcion flecha
const numeroRepetido = (array) => {
    let contador = {};
    let max = 0;
    let resultado = null;

    for (let numero of array) {
        if (contador[numero] === undefined) {
            contador[numero] = 1;
        } else {
            contador[numero] = contador[numero] + 1;
        }

        if (contador[numero] > max) {
            max = contador[numero];
            resultado = numero;
        }
    }

    return resultado;
};

console.log(`usando la funcion flecha`)
console.log(numeroRepetido(numeros));