document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const mensaje = document.getElementById('mensaje');
    const reiniciarBtn = document.getElementById('reiniciar');
    let turno = 'X';
    let juegoTerminado = false;
    let celdas = [];

    // Crear tablero dinámicamente con DOM avanzado
    function crearTablero() {
        tablero.innerHTML = '';
        celdas = [];
        for (let i = 0; i < 9; i++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.dataset.index = i;
            celda.addEventListener('click', manejarClick);
            // Agregar elementos raros
            const emoji = document.createElement('span');
            emoji.textContent = getRandomEmoji();
            celda.appendChild(emoji);
            tablero.appendChild(celda);
            celdas.push(celda);
        }
    }

    function getRandomEmoji() {
        const emojis = ['🌈', '🍕', '🚀', '🐱', '💥', '🦄', '🍔', '🎉', '🔥'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    function manejarClick(event) {
        if (juegoTerminado) return;
        const celda = event.currentTarget;
        if (celda.classList.contains('ocupada')) return;

        // Colocar símbolo con efecto raro
        celda.innerHTML = turno;
        celda.classList.add('ocupada');
        celda.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        celda.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`;

        // Verificar ganador
        if (verificarGanador()) {
            mensaje.textContent = `¡${turno} gana! ¡Explosión de confeti! 🎊`;
            mensaje.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            juegoTerminado = true;
            lanzarConfeti();
            return;
        }

        // Verificar empate
        if (celdas.every(c => c.classList.contains('ocupada'))) {
            mensaje.textContent = '¡Empate! ¡El mundo se acaba! 🌍💥';
            juegoTerminado = true;
            return;
        }

        // Cambiar turno
        turno = turno === 'X' ? 'O' : 'X';
        mensaje.textContent = `Turno de ${turno}`;
        mensaje.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;

        // Efecto raro: cambiar colores de todas las celdas
        celdas.forEach(c => {
            c.style.borderColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        });
    }

    function verificarGanador() {
        const combinaciones = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
            [0, 4, 8], [2, 4, 6] // diagonales
        ];
        return combinaciones.some(combo => {
            return combo.every(index => celdas[index].textContent === turno);
        });
    }

    function lanzarConfeti() {
        for (let i = 0; i < 100; i++) {
            const confeti = document.createElement('div');
            confeti.textContent = '🎉';
            confeti.style.position = 'absolute';
            confeti.style.left = Math.random() * window.innerWidth + 'px';
            confeti.style.top = '-10px';
            confeti.style.fontSize = Math.random() * 30 + 10 + 'px';
            confeti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            document.body.appendChild(confeti);
            setTimeout(() => confeti.remove(), 5000);
        }
    }

    // CSS para confeti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { transform: translateY(${window.innerHeight}px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    reiniciarBtn.addEventListener('click', () => {
        turno = 'X';
        juegoTerminado = false;
        mensaje.textContent = 'Turno de X';
        mensaje.style.color = 'white';
        crearTablero();
        // Efecto raro al reiniciar
        document.body.style.animationDuration = '1s';
        setTimeout(() => document.body.style.animationDuration = '5s', 1000);
    });

    // Inicializar
    crearTablero();
    mensaje.textContent = 'Turno de X';
});