// 1. Definición de variables globales
let alertsHistory = [];
let currentAlertIdx = -1;
let alertTimer = null;

// 2. Función principal
function setupAlertasAsincronas() {
    // Referencias al DOM (dentro de la función para asegurar que existen)
    const alertText = document.getElementById('alert-text');
    const btnToggle = document.getElementById('btn-toggle-alerts');
    const btnMinimize = document.getElementById('btn-minimize');
    const radiocontenedor = document.getElementById('alert-system');
    const minIcon = document.getElementById('min-icon');

    // Definición de la lógica de obtención de datos
    const fetchNuevaAlerta = async () => {
        try {
            const response = await fetch('php/alertas.php');
            if (!response.ok) throw new Error('Error en señal');

            const data = await response.json();

            if (data.status === "success") {
                const mensajeServidor = data.alerta;

                // Actualizar historial e índice
                alertsHistory.push(mensajeServidor);
                currentAlertIdx = alertsHistory.length - 1;

                // Mostrar en el DOM con estilo terminal
                alertText.textContent = "> " + mensajeServidor;
                alertText.style.color = "#ffffff";
                setTimeout(() => alertText.style.color = "#ffffff", 150);
            }
        } catch (error) {
            console.error("Radio Juan fuera de servicio:", error);
            alertText.textContent = "> SEÑAL PERDIDA: RECONECTANDO...";
        }
    };

    // --- EVENTOS DE CONTROL ---

    // Intervalo de la radio
    alertTimer = setInterval(fetchNuevaAlerta, 4000);

    // Botón Pausar / Reanudar
    btnToggle.onclick = () => {
        if (alertTimer) {
            clearInterval(alertTimer);
            alertTimer = null;
            btnToggle.textContent = "Reanudar Radio";
            alertText.style.opacity = "0.5";
        } else {
            alertTimer = setInterval(fetchNuevaAlerta, 8000);
            btnToggle.textContent = "Pausar Radio";
            alertText.style.opacity = "1";
        }
    };

    // Navegación Anterior
    document.getElementById('btn-prev-alert').onclick = () => {
        if (currentAlertIdx > 0) {
            currentAlertIdx--;
            alertText.textContent = "> " + alertsHistory[currentAlertIdx];
        }
    };

    // Navegación Siguiente
    document.getElementById('btn-next-alert').onclick = () => {
        if (currentAlertIdx < alertsHistory.length - 1) {
            currentAlertIdx++;
            alertText.textContent = "> " + alertsHistory[currentAlertIdx];
        }
    };

    // Minimizar / Maximizar
    btnMinimize.onclick = () => {
        radiocontenedor.classList.toggle('minimized');
        minIcon.innerText = radiocontenedor.classList.contains('minimized') ? 'add' : 'remove';
    };

    // Lanzar la primera alerta al cargar
    fetchNuevaAlerta();
}

// 3. Ejecutar el sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupAlertasAsincronas);