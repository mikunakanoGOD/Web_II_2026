// Contar pares e impares en un array utilizando funciones normales y funciones flecha

// funcion normal
const array = [1, 2, 3, 4, 5,6,7,8,9,10];
const resultado = contarParesImpares(array);
console.log(`el resultado con funcion normal: `);
console.log(resultado);

function contarParesImpares(array) {
    let resultado = {
        pares: 0,
        impares: 0
    };

    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            resultado.pares++;
        } else {
            resultado.impares++;
        }
    }

    return resultado;
}

// funcion flecha
const contarParesImparesFlecha = (array) => {
    let resultado = {
        pares: 0,
        impares: 0
    };

    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            resultado.pares++;
        } else {
            resultado.impares++;
        }
    }

    return resultado;
}

const resultadoFlecha = contarParesImparesFlecha(array);
console.log(`el resultado con funcion flecha: `);
console.log(resultadoFlecha);