// --- LÓGICA DEL REPRODUCTOR DE VÍDEO (UT6 + UT7) ---
function inicializarReproductor() {
    const vContainer = document.getElementById('video-container');

    // 1. Crear el elemento Vídeo
    const video = document.createElement('video');
    video.src = "video/trailer_juan.mp4";
    video.width = 100; // El CSS se encargará del resto

    // 2. Crear Contenedor de Controles
    const controls = document.createElement('div');
    controls.className = "video-controls";

    // 3. Crear Botones y Slider
    const btnPlay = document.createElement('button');
    btnPlay.textContent = "PLAY";
    btnPlay.disabled = true; // Deshabilitado hasta que canplay (UT6)

    const btnReset = document.createElement('button');
    btnReset.textContent = "REINICIAR";

    const volSlider = document.createElement('input');
    volSlider.type = "range";
    volSlider.min = 0; volSlider.max = 1; volSlider.step = 0.1; volSlider.value = 0.5;

    const barraProgreso = document.createElement('progress');
    barraProgreso.value = 0; barraProgreso.max = 100;

    const infoEstado = document.createElement('span');
    infoEstado.id = "video-status";
    infoEstado.textContent = "CARGANDO...";

    // 4. AppendChild (UT6)
    controls.appendChild(btnPlay);
    controls.appendChild(btnReset);
    controls.appendChild(volSlider);
    controls.appendChild(barraProgreso);
    controls.appendChild(infoEstado);
    vContainer.appendChild(video);
    vContainer.appendChild(controls);

    // --- EVENTOS DEL VÍDEO (UT7) ---

    // loadedmetadata: Inicializa duración
    video.onloadedmetadata = () => console.log("Video listo: " + video.duration + "s");

    // canplay: Habilita botones cuando está listo
    video.oncanplay = () => {
        btnPlay.disabled = false;
        infoEstado.textContent = "LISTO";
    };

    // play / pause: Cambiar estado visual
    btnPlay.onclick = () => {
        if (video.paused) {
            video.play();
            btnPlay.textContent = "PAUSE";
            infoEstado.textContent = "REPRODUCIENDO";
            infoEstado.style.color = "#00ff00";
        } else {
            video.pause();
            btnPlay.textContent = "PLAY";
            infoEstado.textContent = "EN PAUSA";
            infoEstado.style.color = "#ffff00";
        }
    };

    // Reiniciar
    btnReset.onclick = () => {
        video.load();
        btnPlay.textContent = "PLAY";
    };

    // Volumen
    volSlider.oninput = () => video.volume = volSlider.value;

    // timeupdate: Actualiza barra en tiempo real
    video.ontimeupdate = () => {
        const porcentaje = (video.currentTime / video.duration) * 100;
        barraProgreso.value = porcentaje;
    };

    // ended: Al finalizar
    video.onended = () => {
        infoEstado.textContent = "FINALIZADO";
        btnPlay.textContent = "REPLAY";
        infoEstado.style.color = "#ac1313";
    };
}

// Llamamos a la función al cargar la página
inicializarReproductor();