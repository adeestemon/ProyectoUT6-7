let alertsHistory = [];
let currentAlertIdx = -1;
let alertTimer = null;

function setupAlertasAsincronas() {
    const alertText = document.getElementById('alert-text');
    const btnToggle = document.getElementById('btn-toggle-alerts');

    const fetchNuevaAlerta = () => {
        const posiblesAlertas = [
            "⚠️ Horda detectada en el Malecón.",
            "⚠️ Suministros lanzados cerca del Capitolio.",
            "⚠️ Se busca a Juan por 'exceso de eficiencia'.",
            "⚠️ Zona Vedado declarada INFECTADA.",
            "⚠️ Falla eléctrica en Habana Vieja.",
            "⚠️ Refugio seguro confirmado en El Morro."
        ];
        const msg = posiblesAlertas[Math.floor(Math.random() * posiblesAlertas.length)];
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const nuevaAlerta = `[${timestamp}] ${msg}`;
        alertsHistory.push(nuevaAlerta);
        currentAlertIdx = alertsHistory.length - 1;
        alertText.textContent = nuevaAlerta;

        // Pequeño efecto visual de "nueva señal"
        alertText.style.color = "#fff";
        setTimeout(() => alertText.style.color = "#ffffff", 500);
    };

    alertTimer = setInterval(fetchNuevaAlerta, 8000);

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

    // Lanzar la primera alerta nada más cargar
    fetchNuevaAlerta();

    const btnMinimize = document.getElementById('btn-minimize');
    const radioContainer = document.getElementById('alert-system');
    const minIcon = document.getElementById('min-icon');

    btnMinimize.onclick = () => {
        // Alterna la clase: si la tiene la quita, si no la tiene la pone
        radioContainer.classList.toggle('minimized');

        // Cambiamos el icono para que el usuario sepa qué va a pasar
        if (radioContainer.classList.contains('minimized')) {
            minIcon.innerText = 'add'; // Muestra "+" para maximizar
        } else {
            minIcon.innerText = 'remove'; // Muestra "-" para minimizar
        }
    };
}

// Ejecutar
setupAlertasAsincronas();