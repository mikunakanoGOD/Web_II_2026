//encontrar la palabra mas larga en una frase, utilizando una funcion normal y una funcion flecha
const frase = "papa casa hambre";

//funcion normal
function encontrarPalabraMasLarga(frase) {
    const palabras = frase.split(" ");
    let palabraMasLarga = "";
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].length > palabraMasLarga.length) {
            palabraMasLarga = palabras[i];
        }
    }
    return palabraMasLarga;
}

const palabraMasLarga = encontrarPalabraMasLarga(frase);
console.log(`usando la funcion normal,la palabra mas larga es: ${palabraMasLarga}`);

//funcion flecha
const encontrarPalabraMasLargaFlecha = (frase) => {
    const palabras = frase.split(" ");
    let palabraMasLarga = "";
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].length > palabraMasLarga.length) {
            palabraMasLarga = palabras[i];
        }
    }
    return palabraMasLarga;
}
const palabraMasLargaFlecha = encontrarPalabraMasLargaFlecha(frase);
console.log(`usando la funcion flecha, la palabra mas larga es: ${palabraMasLargaFlecha}`);