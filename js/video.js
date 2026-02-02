const video = document.getElementById('main-video');
const playBtn = document.getElementById('play-pause');
const resetBtn = document.getElementById('reset');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time-display');
const volumeSlider = document.getElementById('volume-slider');
const statusMsg = document.getElementById('status-message');

// Formatear segundos a 00:00
const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 1. loadedmetadata: Inicializa barra y duración
video.addEventListener('loadedmetadata', () => {
    progressBar.max = video.duration;
    timeDisplay.innerText = `00:00 / ${formatTime(video.duration)}`;
});

// 2. canplay: Habilita controles
video.addEventListener('canplay', () => {
    console.log("Video listo para reproducir");
    playBtn.disabled = false;
});

// 3. Play / Pause
playBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playBtn.innerText = 'Pause';
    } else {
        video.pause();
        playBtn.innerText = 'Play';
    }
});

// 4. Reiniciar
resetBtn.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    video.play();
    statusMsg.innerText = "";
});

// 5. timeupdate: Actualiza barra y tiempo actual
video.addEventListener('timeupdate', () => {
    // 1. Actualizar valor y texto (lo que ya tenías)
    progressBar.value = video.currentTime;
    timeDisplay.innerText = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;

    // 2. TRUCO: Calcular el porcentaje y mover el color
    const percentage = (video.currentTime / video.duration) * 100;
    
    // Cambiamos el fondo dinámicamente (Rojo oscuro para la parte recorrida, Gris para la restante)
    progressBar.style.background = `linear-gradient(to right, #8B0000 ${percentage}%, #111 ${percentage}%)`;
});

// 6. Saltar a un punto del video (input en barra)
progressBar.addEventListener('input', () => {
    video.currentTime = progressBar.value;
});

// 7. Control de volumen
volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
});

// 8. ended: Mensaje al finalizar
video.addEventListener('ended', () => {
    statusMsg.innerText = "Protocolo finalizado. Puede cerrar la ventana.";
    playBtn.innerText = 'Play';
});