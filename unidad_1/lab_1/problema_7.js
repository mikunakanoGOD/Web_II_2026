//array con numeros donde se suma una propiedad especifica

//funcion normal
const productos = [
    { nombre: "Laptop", precio: 1000 },
    { nombre: "Mouse", precio: 50 },
    { nombre: "Teclado", precio: 80 }
];

function sumarPropiedad(array, propiedad) {
    let suma = 0;

    for (let i = 0; i < array.length; i++) {
    suma = suma + array[i][propiedad];
    }

    return suma;
}

console.log(`usando función normal:`);
console.log(sumarPropiedad(productos));

//funcion flecha
const sumarPropiedadFlecha = (array, propiedad) => {
    let suma = 0;

    for (let i = 0; i < array.length; i++) {
    suma = suma + array[i][propiedad];
    }

    return suma;
};

console.log(`usando funcion flecha:`);
console.log(sumarPropiedadFlecha(productos));