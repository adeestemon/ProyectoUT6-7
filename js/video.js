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
    const icon = document.getElementById('play-icon');

    if (video.paused) {
        video.play();
        icon.innerText = 'pause_circle'; // Cambia a icono de pausa
    } else {
        video.pause();
        icon.innerText = 'play_circle';  // Cambia a icono de play
    }
});

// IMPORTANTE: También cámbialo en el evento 'ended'
video.addEventListener('ended', () => {
    const icon = document.getElementById('play-icon');
    statusMsg.innerText = "Protocolo finalizado. Puede cerrar la ventana.";
    icon.innerText = 'play_circle'; // Vuelve a play cuando termina
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
    progressBar.value = video.currentTime;
    timeDisplay.innerText = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;

    const ratio = video.currentTime / video.duration;

    // EXPLICACIÓN:
    // El thumb mide 30px. En el 0%, el centro del zombie está a 15px de la izquierda.
    // En el 100%, el centro está a 15px de la derecha.
    // Este cálculo matemático ajusta el gradiente para que SIEMPRE caiga bajo el zombie.
    const thumbWidth = 30;
    const progressBarWidth = progressBar.offsetWidth;
    const centerOffset = (thumbWidth / 2) / progressBarWidth * 100;

    // Mapeamos el porcentaje para que vaya de (0 + offset) a (100 - offset)
    const adjustedPercentage = (ratio * (100 - (centerOffset * 2))) + centerOffset;

    progressBar.style.background = `linear-gradient(to right, #8B0000 ${adjustedPercentage}%, #111 ${adjustedPercentage}%)`;
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
    statusMsg.innerText = "El video ha terminao, puede seguir bajando.";
    playBtn.innerText = 'Play';
});