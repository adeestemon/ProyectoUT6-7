let alertsHistory = [];
let currentAlertIdx = -1;
let alertTimer = null;

// Configurar sistema de alertas asincrónicas
function setupAlertasAsincronas() {
    const videoSection = document.querySelector('.video-section');
    
    // Crear contenedor de alertas dinámicamente
    const alertDisplay = document.createElement('div');
    alertDisplay.id = "alert-system";
    alertDisplay.style = "background: #1a1a1a; color: #ff0000; padding: 15px; border: 1px dashed red; margin-top: 20px; font-family: monospace;";
    
    alertDisplay.innerHTML = `
        <h4>📡 RADIO REBELDE: ALERTAS EN VIVO</h4>
        <p id="alert-text">Esperando señal...</p>
        <div class="alert-nav">
            <button id="btn-prev-alert">⬅️ Ant.</button>
            <button id="btn-toggle-alerts">Pausar Radio</button>
            <button id="btn-next-alert">Sig. ➡️</button>
        </div>
    `;
    // Añadir al DOM
    videoSection.appendChild(alertDisplay);

    const alertText = document.getElementById('alert-text');
    const btnToggle = document.getElementById('btn-toggle-alerts');

    // Simular servidor de alertas
    const fetchNuevaAlerta = () => {
        const posiblesAlertas = [
            "⚠️ Horda detectada en el Malecón.",
            "⚠️ Suministros lanzados cerca del Capitolio.",
            "⚠️ Se busca a Juan por 'exceso de eficiencia'.",
            "⚠️ Zona Vedado declarada INFECTADA."
        ];
        const msg = posiblesAlertas[Math.floor(Math.random() * posiblesAlertas.length)];
        const timestamp = new Date().toLocaleTimeString();
        
        const nuevaAlerta = `[${timestamp}] ${msg}`;
        alertsHistory.push(nuevaAlerta);
        currentAlertIdx = alertsHistory.length - 1;
        alertText.textContent = nuevaAlerta;
    };

    // Iniciar intervalo
    alertTimer = setInterval(fetchNuevaAlerta, 8000); // Cada 8 seg

    // Botón Detener / Reanudar
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

    // Navegación Anterior / Siguiente
    document.getElementById('btn-prev-alert').onclick = () => {
        if (currentAlertIdx > 0) {
            currentAlertIdx--;
            alertText.textContent = alertsHistory[currentAlertIdx];
        }
    };

    document.getElementById('btn-next-alert').onclick = () => {
        if (currentAlertIdx < alertsHistory.length - 1) {
            currentAlertIdx++;
            alertText.textContent = alertsHistory[currentAlertIdx];
        }
    };
}

setupAlertasAsincronas();