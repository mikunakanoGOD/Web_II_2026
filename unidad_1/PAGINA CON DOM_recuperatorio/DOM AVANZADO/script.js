import Form from "./components/formulario.js";
import tabla from "./components/tabla.js";
import cards from "./components/cards.js";

(() => {
    // Cargar tareas iniciales desde el JSON
    fetch('./api/tareas.json')
        .then(res => res.json())
        .then(tareas => {
            tareas.forEach(task => tabla.addTask(task));
            cards.update();
        })
        .catch(err => console.error('Error al cargar tareas.json:', err));

    // Nuevas tareas desde el formulario
    Form.setDatos((task) => {
        tabla.addTask(task);
        cards.update();
    });
})();
