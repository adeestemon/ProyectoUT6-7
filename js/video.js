const video = document.getElementById('main-video');
const playBtn = document.getElementById('play-pause');
const resetBtn = document.getElementById('reset');
const progresoBarra = document.getElementById('progreso-barra');
const timeDisplay = document.getElementById('time-display');
const volumenSlider = document.getElementById('volumen-slider');
const mensaje = document.getElementById('mensaje');
const icon = document.getElementById('play-icon');
// Extra
const audioExterno = document.querySelector('audio');
const btnSubs = document.getElementById('toggle-subs');
const btnAudio = document.getElementById('toggle-audio');

// Formatear tiempo
function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


// loadedmetadata
video.addEventListener('loadedmetadata', () => {
    progresoBarra.max = video.duration;
    timeDisplay.innerText = `00:00 / ${formatTime(video.duration)}`;
});


// play / pause
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


// reiniciar
resetBtn.addEventListener('click', () => {
    video.currentTime = 0;
    video.play();
    icon.innerText = "pause_circle";
});


// actualizar progreso
video.addEventListener('timeupdate', () => {

    progresoBarra.value = video.currentTime;

    timeDisplay.innerText =
        `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;

    // fondo rojo dinámico bajo el zombie
    const porcentaje = (video.currentTime / video.duration) * 100;
    progresoBarra.style.background =
        `linear-gradient(to right, #8B0000 ${porcentaje}%, #444 ${porcentaje}%)`;
});


// mover barra
progresoBarra.addEventListener('input', () => {
    video.currentTime = progresoBarra.value;
});


// volumen
volumenSlider.addEventListener('input', () => {
    video.volume = volumenSlider.value;
});


// ended
video.addEventListener('ended', () => {
    icon.innerText = "play_circle";
    mensaje.innerText = "Video finalizado.";
});


// Subtitulos
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

// Audio
let usandoAudioExterno = false;

btnAudio.addEventListener('click', () => {
    usandoAudioExterno = !usandoAudioExterno;

    if (usandoAudioExterno) {
        video.muted = true;
        audioExterno.currentTime = video.currentTime;
        audioExterno.play();
        btnAudio.style.color = "#8B0000";
    } else {
        video.muted = false;
        audioExterno.pause();
        btnAudio.style.color = "white";
    }
});

// Sincronizar tiempos
video.addEventListener('play', () => {
    if (usandoAudioExterno) audioExterno.play();
});

video.addEventListener('pause', () => {
    audioExterno.pause();
});

video.addEventListener('seeking', () => {
    if (usandoAudioExterno) audioExterno.currentTime = video.currentTime;
});