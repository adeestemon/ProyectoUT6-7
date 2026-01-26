// 1. DATOS DE SERVICIOS
const servicios = [
    { titulo: "Eliminación de Personas", desc: "Matamos a sus seres queridos.", img: "img/zombie.png" },
    { titulo: "Eliminación de Mascotas", desc: "Peluditos pero peligrosos.", img: "img/aymigatitozombie.png" },
    { titulo: "Búsqueda de personas", desc: "Buscamos a tu persona querida.", img: "img/azotea.png" }
];

// 2. CREACIÓN DINÁMICA DE SERVICIOS (Al cargar la web)
const container = document.getElementById('services-container');

servicios.forEach(s => {
    // Crear el elemento tarjeta
    const card = document.createElement('div');
    card.className = 'service-card';

    // Crear la imagen
    const imagen = document.createElement('img');
    imagen.src = s.img;
    imagen.className = 'service-img';

    // Crear el título
    const h3 = document.createElement('h3');
    h3.textContent = s.titulo;

    // Crear la descripción
    const p = document.createElement('p');
    p.textContent = s.desc;

    // AppendChild: meter todo dentro de la tarjeta
    card.appendChild(imagen);
    card.appendChild(h3);
    card.appendChild(p);

    // Meter la tarjeta en el grid
    container.appendChild(card);
});

document.getElementById('form-encargo').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const tel = document.getElementById('telefono').value;
    const urgencia = document.querySelector('input[name="urgencia"]:checked').value;
    const descripcion = document.getElementById('descripcion').value;

    if (nombre.length < 3) {
        alert("El nombre es demasiado corto para los registros de Juan.");
        return;
    }

    crearTarjetaEncargo(nombre, apellidos, tel, urgencia, descripcion);

    alert("✅ Encargo registrado. No abra la puerta a nadie que no sea Juan.");
    this.reset();
});

/**
 * Función principal para crear la tarjeta de encargo y gestionar sus acciones
 */
function crearTarjetaEncargo(nombre, apellidos, tel, urgencia, desc) {
    const listaPendientes = document.getElementById('lista-encargos');
    const nuevoEncargo = document.createElement('div');
    nuevoEncargo.className = 'service-card encargo-item';

    // 1. CAMBIAR ATRIBUTOS/ESTILOS DINÁMICAMENTE
    // Si es urgente, resaltamos la tarjeta con CSS directo
    if (urgencia === "alta") {
        nuevoEncargo.style.border = "2px solid #ff0000";
        nuevoEncargo.style.boxShadow = "0 0 15px rgba(255, 0, 0, 0.4)";
    } else {
        nuevoEncargo.style.borderLeft = "5px solid #ac1313";
    }

    // Contenido de la tarjeta
    nuevoEncargo.innerHTML = `
<div class="encargo-card">
    <div class="card-header">
        <div class="header-top">
            <h3>${nombre.toUpperCase()} ${apellidos.toUpperCase()}</h3>
            <span class="badge badge-${urgencia.toLowerCase()}">${urgencia.toUpperCase()}</span>
        </div>
        <div class="header-sub">
            <span class="phone-number">📞 ${tel}</span>
        </div>
    </div>

    <div class="card-body">
        <div class="desc-box">
            <p>"${desc || 'Sin descripción'}"</p>
        </div>
        <div class="status-row">
            <span>Estado:</span>
            <span class="status-badge pending">PENDIENTE</span>
        </div>
    </div>

    <div class="card-footer">
        <button class="btn btn-complete">Finalizar</button>
        <button class="btn btn-clone">Duplicar</button>
        <button class="btn btn-delete">Eliminar</button>
    </div>
</div>
    `;

    // 2. ELIMINAR (Desde el padre)
    nuevoEncargo.querySelector('.btn-delete').onclick = function () {
        if (confirm("¿Seguro que quieres cancelar? Juan no devuelve el depósito.")) {
            // Accedemos al padre (lista-encargos) para remover al hijo
            listaPendientes.removeChild(nuevoEncargo);
        }
    };

    // 3. CLONAR ENCARGO
    nuevoEncargo.querySelector('.btn-clone').onclick = function () {
        // Clonamos el nodo (true para clonar también hijos y eventos no inline)
        const clon = nuevoEncargo.cloneNode(true);

        // Los eventos asignados por propiedad (onclick) no se clonan con cloneNode en algunos casos, 
        // así que reasignamos las funciones al clon para que sea funcional
        rebindEventos(clon);

        listaPendientes.appendChild(clon);
        alert("Encargo duplicado. Doble trabajo, doble paga.");
    };

    // 4. MOVER / COMPLETAR
    nuevoEncargo.querySelector('.btn-complete').onclick = function () {
        // Cambiamos estilos para reflejar que está terminado
        nuevoEncargo.style.opacity = "0.6";
        nuevoEncargo.style.filter = "grayscale(1)";
        nuevoEncargo.querySelector('.estado-texto').textContent = "COMPLETADO";
        nuevoEncargo.querySelector('.estado-texto').style.color = "#28a745";

        // Deshabilitamos botones para que no se pueda interactuar más
        this.disabled = true;
        this.style.backgroundColor = "#888";
        nuevoEncargo.querySelector('.btn-clone').style.display = "none";

        alert("Servicio cumplido. Un problema menos en La Habana.");
    };

    listaPendientes.appendChild(nuevoEncargo);
}

/**
 * Función auxiliar para que los clones también tengan botones funcionales
 */
function rebindEventos(elemento) {
    const btnDel = elemento.querySelector('.btn-delete');
    const btnClone = elemento.querySelector('.btn-clone');
    const btnComp = elemento.querySelector('.btn-complete');

    btnDel.onclick = () => elemento.remove();
    btnClone.onclick = () => {
        const otroClon = elemento.cloneNode(true);
        rebindEventos(otroClon);
        elemento.parentNode.appendChild(otroClon);
    };
    btnComp.onclick = () => {
        elemento.style.opacity = "0.5";
        btnComp.disabled = true;
        elemento.querySelector('.estado-texto').textContent = "COMPLETADO";
    };
}