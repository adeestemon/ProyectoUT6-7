function inicializarReproductor() {
    const vContainer = document.getElementById('video-container');

    // Crear el elemento Vídeo
    const video = document.createElement('video');
    video.src = "video/trailer_juan.mp4";
    video.width = 100; // El CSS se encargará del resto

    // Crear Contenedor de Controles
    const controls = document.createElement('div');
    controls.className = "video-controls";

    // Crear Botones y Slider
    const btnPlay = document.createElement('button');
    btnPlay.textContent = "PLAY";
    btnPlay.disabled = true; // Deshabilitado hasta que canplay

    const btnReset = document.createElement('button');
    btnReset.textContent = "REINICIAR";

    const volSlider = document.createElement('input');
    volSlider.type = "range";
    volSlider.min = 0; volSlider.max = 1; volSlider.step = 0.1; volSlider.value = 0.5;

    const barraProgreso = document.createElement('input');
    barraProgreso.type = "range"; barraProgreso.value = 0;

    const infoEstado = document.createElement('span');
    infoEstado.id = "video-status";
    infoEstado.textContent = "CARGANDO...";

    // Añadir controles al contenedor
    controls.appendChild(btnPlay);
    controls.appendChild(btnReset);
    controls.appendChild(volSlider);
    controls.appendChild(barraProgreso);
    controls.appendChild(infoEstado);
    vContainer.appendChild(video);
    vContainer.appendChild(controls);

    /* Eventos del reproductor*/
    // loadedmetadata: Inicializa duración
    video.onloadedmetadata = () => barraProgreso.max = Math.floor(video.duration);

    // canplay: Habilita botones cuando está listo
    video.oncanplay = () => { btnPlay.disabled = false; infoEstado.textContent = "LISTO"; };

    // timeupdate: Actualiza barra en tiempo real
    video.ontimeupdate = () => {
        barraProgreso.value = Math.floor(video.currentTime);
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

    // Barra de progreso
    barraProgreso.oninput = () => video.currentTime = barraProgreso.value;

    // Finalizado
    video.onended = () => {
        infoEstado.textContent = "FINALIZADO";
        btnPlay.textContent = "REPLAY";
        infoEstado.style.color = "#ac1313";
    };
}

inicializarReproductor();