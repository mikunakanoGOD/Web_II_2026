const Form = (()=>{
        const form = document.querySelector('[data-form]');//accedemos al formulario
        const inputTask = document.querySelector('[data-input-task]');//recupero la tarea
        const inputDescription = document.querySelector('[data-input-descripcion]');//recupero la descripcion
        const inputFecha = document.querySelector('[data-input-fecha]')//recuperamos la fecha
        const inputPrioridad = document.querySelector('[data-input-prioridad]');//recupero la prioridad

        const datosForm = ()=>{
            return{
                task: inputTask.value.trim(),
                description: inputDescription.value.trim(),
                date: inputFecha.value.trim(),
                priority: inputPrioridad.value.trim()
            };
        };
        const reset =()=>{
            inputTask.value="";
            inputDescription.value="";
            inputFecha.value="";
            inputPrioridad.value="";
        };
        const setDatos=(callback)=>{
            console.log("hola");
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                callback(datosForm());
                reset();
            });
        };
        return{setDatos,}
        
    })();
    export default Form;