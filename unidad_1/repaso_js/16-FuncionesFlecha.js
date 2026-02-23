const saludar = () => {
    console.log("funcion flecha");
};
saludar();

const duplicar = numero => {
    return numero * 2;
}
console.log(duplicar(5));

const suma = (a, b) =>{
    return a + b;
}
console.log(suma(2, 3));

const CrearUsuario = (nombre, edad) => ({nombre, edad});
console.log(CrearUsuario("Juan", 28));

const numero = [3, 2, 4, 5, 6, 20]
//funcion para filtrar

const ProcesarNumeros = (numeros) => {
    return numeros
    .filter(numero => numero > 10)
    .map(numero => numero * 2)
};

const resultado = ProcesarNumeros(numero);
console.log(resultado);

const usuarios = [
    {nombre: "Juan", edad:23},
    {nombre: "Luis", edad:33},
    {nombre: "Maria", edad:25},
    {nombre: "Santy", edad:90},
    {nombre: "Felipe", edad:43},
];
const procesarUsuarios = (usuarios) => {
    return usuarios
    .filter(usuario => usuario.edad > 18)
    .map(usuario =>{
        const{nombre} = usuario;
        return nombre.length > 5 ? nombre.toUpperCase() : nombre.toLowerCase();
    });
};
const result2 = procesarUsuarios(usuarios);
console.log(result2);