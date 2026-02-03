const video = document.getElementById('main-video');
const playBtn = document.getElementById('play-pause');
const resetBtn = document.getElementById('reset');
const progresoBarra = document.getElementById('progreso-barra');
const timeDisplay = document.getElementById('time-display');
const volumenSlider = document.getElementById('volumen-slider');
const mensaje = document.getElementById('mensaje');
const icon = document.getElementById('play-icon');
const btnSubs = document.getElementById('toggle-subs');

// Formatear tiempo con segundos
function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


// loadedmetadata
// El video carga la duración del video
video.addEventListener('loadedmetadata', () => {
    progresoBarra.max = video.duration;
    timeDisplay.innerText = `00:00 / ${formatTime(video.duration)}`;
});


// Controles de reproducción play / pause
playBtn.addEventListener('click', () => {

    if (video.paused) {
        video.play();
        icon.innerText = "pause_circle";
        mensaje.innerText = "";
    } else {
        video.pause();
        icon.innerText = "play_circle";
    }

});


// Control de reiniciar vuelve el tiempo a 0
resetBtn.addEventListener('click', () => {
    video.currentTime = 0;
    video.play();
    icon.innerText = "pause_circle";
});


// timeupdate
// Actualizar progreso
video.addEventListener('timeupdate', () => {
    progresoBarra.value = video.currentTime; // mueve el deslizador de la barra

    // Actualiza el contrador del tiempo actual / total
    timeDisplay.innerText =
        `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;

    // Fondo rojo dinámico bajo el zombie que sigue el progreso del video
    const porcentaje = (video.currentTime / video.duration) * 100;
    progresoBarra.style.background =
        `linear-gradient(to right, #8B0000 ${porcentaje}%, #444 ${porcentaje}%)`;
});


// Control del usuario al mover barra de progreso
progresoBarra.addEventListener('input', () => {
    video.currentTime = progresoBarra.value;
});


// Control del usuario al volumen
volumenSlider.addEventListener('input', () => {
    video.volume = volumenSlider.value;
});


// ended
// Finalización del video y acción
video.addEventListener('ended', () => {
    icon.innerText = "play_circle";
    mensaje.innerText = "Video finalizado.";
});


// Subtitulos
// Alterna visibilidad de los primeros textos
Array.from(video.textTracks).forEach(track => track.mode = 'hidden');
btnSubs.addEventListener('click', () => {
    const track = video.textTracks;
    if (track[0].mode === 'showing') {
        track[0].mode = 'hidden';
        btnSubs.style.color = 'white';
    } else {
        track[0].mode = 'showing';
        btnSubs.style.color = '#8B0000';
    }
});

