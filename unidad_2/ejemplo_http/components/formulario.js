const API_URL = "http://localhost:3001/posts";

const Form = (() => {
    const form = document.querySelector('[data-form]');
    const inputTitulo = document.querySelector('[data-input-task]');
    const inputDescripcion = document.querySelector('[data-input-descripcion]');
    const inputFecha = document.querySelector('[data-input-fecha]');

    const datosForm = () => {
        return {
            titulo: inputTitulo.value.trim(),
            descripcion: inputDescripcion.value.trim(),
            fecha: inputFecha.value ? inputFecha.value : new Date().toISOString(),
        };
    };

    const reset = () => {
        inputTitulo.value = "";
        inputDescripcion.value = "";
        inputFecha.value = "";
    };

    const setDatos = (callback) => {
        if (!form) return;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const postData = datosForm();
            callback(postData);
            reset();
        });
    };

    return { setDatos };
})();

const enviarPost = (postData) => {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(postData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! estado: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => showResult(data))
        .catch((error) => showResult(error.message, true));
};

Form.setDatos(enviarPost);

export default Form;