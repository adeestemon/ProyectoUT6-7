let alertsHistory = [];
let currentAlertIdx = -1;
let alertTimer = null;

function setupAlertasAsincronas() {

    const alertText = document.getElementById('alert-text');
    const btnToggle = document.getElementById('btn-toggle-alerts');
    const btnMinimize = document.getElementById('btn-minimize');
    const radiocontenedor = document.getElementById('alert-system');
    const minIcon = document.getElementById('min-icon');

    // Lógica de obtención de datos
    const fetchNuevaAlerta = async () => {
        try {
            // Petición asíncrona al archivo PHP
            const response = await fetch('php/alertas.php');
            if (!response.ok) throw new Error('Error en señal');

            // convierte respuesta JSON en un objeto de JS
            const data = await response.json();

            if (data.status === "success") {
                const mensajeServidor = data.alerta;

                // Guarda el mensaje en el historial
                alertsHistory.push(mensajeServidor);
                currentAlertIdx = alertsHistory.length - 1;

                // Mostrar en el DOM con estilo terminal
                alertText.textContent = "> " + mensajeServidor;
                alertText.style.color = "#ffffff";
                setTimeout(() => alertText.style.color = "#ffffff", 150);
            }
        } catch (error) {
            // Si el servidor falla o no hay internet
            console.error("Radio Juan fuera de servicio:", error);
            alertText.textContent = "> SEÑAL PERDIDA: RECONECTANDO...";
        }
    };

    // --- EVENTOS DE CONTROL ---

    // Inicia el temporizador
    alertTimer = setInterval(fetchNuevaAlerta, 4000);

    // Botón Pausar / Reanudar / Iniciar el setInterval
    btnToggle.onclick = () => {
        if (alertTimer) {
            clearInterval(alertTimer); // detiene el temporizador
            alertTimer = null;
            btnToggle.textContent = "Reanudar Radio";
            alertText.style.opacity = "0.5";
        } else {
            alertTimer = setInterval(fetchNuevaAlerta, 8000); // activa el temporizador
            btnToggle.textContent = "Pausar Radio";
            alertText.style.opacity = "1";
        }
    };

    // Navegación atras
    // Busca en el historial alertas guardadas
    document.getElementById('btn-prev-alert').onclick = () => {
        if (currentAlertIdx > 0) {
            currentAlertIdx--;
            alertText.textContent = "> " + alertsHistory[currentAlertIdx];
        }
    };

    // Navegación siguiente
    document.getElementById('btn-next-alert').onclick = () => {
        if (currentAlertIdx < alertsHistory.length - 1) {
            currentAlertIdx++;
            alertText.textContent = "> " + alertsHistory[currentAlertIdx];
        }
    };

    // Minimizar
    btnMinimize.onclick = () => {
        radiocontenedor.classList.toggle('minimized');
        minIcon.innerText = radiocontenedor.classList.contains('minimized') ? 'add' : 'remove';
    };

    // Lanzar la primera alerta al cargar
    fetchNuevaAlerta();
}

document.addEventListener('DOMContentLoaded', setupAlertasAsincronas);