import cards from "./cards.js";
const tabla =(()=>{
        const cuerpoTabla = document.getElementById('taskTable').getElementsByTagName('tbody')[0];//recupero los elementos de la tabla para ponerlo al body
        const addTask=(task)=>{
            const nuevaFila = cuerpoTabla.insertRow();//creamos una nueva fila
                nuevaFila.insertCell(0).textContent=task.task;
                nuevaFila.insertCell(1).textContent=task.description;
                nuevaFila.insertCell(2).textContent=task.date;
                nuevaFila.insertCell(3).textContent=task.priority;
                // Si viene del JSON con completed:true, marcar la fila
                if (task.completed) nuevaFila.classList.add('completed');
        //agregamos acciones
        const accionCell = nuevaFila.insertCell(4);
        const acciones = document.createElement('div');
        acciones.className = 'actions';
        //crear botones
        const completeButton =document.createElement('button');
        completeButton.textContent='Hecho';
        completeButton.className='view';
        completeButton.addEventListener('click',()=>{
            nuevaFila.classList.toggle('completed');
            //pendiente actualizar cards
            cards.update();
        });
        acciones.appendChild(completeButton);

        const deleteButton =document.createElement('button');
        deleteButton.textContent='eliminar';
        deleteButton.className='delete';
        deleteButton.addEventListener('click',()=>{
            cuerpoTabla.deleteRow(nuevaFila.rowIndex-1);
            //pendiente actualizar cards
            cards.update();
            //cards.update();
        });
        acciones.appendChild(deleteButton);
        accionCell.appendChild(acciones);
        };


        const getTask = () => {
            return Array.from(cuerpoTabla.rows).map(row => ({
                task: row.cells[0].textContent,
                description: row.cells[1].textContent,
                date: row.cells[2].textContent,
                priority: row.cells[3].textContent,
                completed: row.classList.contains('completed')
            }));
        };
        return { addTask, getTask };
    })();
    export default tabla;