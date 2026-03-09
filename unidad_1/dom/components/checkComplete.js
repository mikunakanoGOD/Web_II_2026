// Cada componente lógico (como el check) se separa en su propia función flecha
    const checkcomplete = () => {
        const i = document.createElement('i');
        // Se añaden las clases por separado cuando hay espacios en el nombre
        i.classList.add('far', 'fa-check-square', 'icon');
        i.addEventListener('click', color);
        return i; // Es vital retornar el elemento para que appendChild lo encuentre
    }

        const color = (evento) => {
        // Cambiamos el estilo del check usando el target del evento
        const element = evento.target; 
        element.classList.toggle('fas'); 
        element.classList.toggle('completeIcon');
        element.classList.toggle('far');
    };

    export default checkcomplete;