// SERVICIOS DINÁMICOS

const servicios = [
    { titulo: "Eliminación de personas", desc: "Matamos a sus seres queridos.", img: "img/zombie.png" },
    { titulo: "Eliminación de mascotas", desc: "Peluditos pero peligrosos.", img: "img/aymigatitozombie.png" },
    { titulo: "Refuerzo de vivienda", desc: "Asegura tu refugio contra cualquier amenaza.", img: "img/casa-reforzada.png" },
];

const contenedor = document.getElementById('servicios-contenedor');

if (contenedor) {
    servicios.forEach(s => {
        const card = document.createElement('div');
        card.className = 'servicios-card';

        card.innerHTML = `
            <img src="${s.img}" class="servicios-img">
            <h3>${s.titulo}</h3>
            <p>${s.desc}</p>
        `;

        contenedor.appendChild(card);
    });
}

// FORMULARIO ENCARGOS
const form = document.getElementById('form-encargo');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        //  Empaquetamos todo lo que se ha enviado
        const formData = new FormData(form);

        //  Se envia al servidor
        fetch('php/subirForm.php', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(datos => {
                if (datos.status === "success") {
                    // Capturamos los valores para colocarlos en la lista de encargos
                    // Usamos "datos.url" que es la ruta que nos devuelve el PHP
                    const nombre = document.getElementById('nombre').value;
                    const apellidos = document.getElementById('apellidos').value;
                    const tel = document.getElementById('telefono').value;
                    const urgencia = document.querySelector('input[name="urgencia"]:checked').value;
                    const descripcion = document.getElementById('descripcion').value;

                    const extrasCheckboxes = document.querySelectorAll('input[name="extra"]:checked');
                    const extrasArray = Array.from(extrasCheckboxes).map(cb => {
                        let texto = cb.value;
                        return texto.charAt(0).toUpperCase() + texto.slice(1);
                    });

                    const extrasTexto = extrasArray.length > 0 ? extrasArray.join("<br>") : "Ninguno";
                    // Creamos los datos de la lista
                    crearEncargo(nombre, apellidos, tel, urgencia, descripcion, datos.url, extrasTexto);
                    form.reset();
                } else {
                    alert("Error al subir el encargo");
                }
            })
            .catch(error => console.error('Error:', error));
    });
}

// AÑADE EL ENCARGO DEL FORMULARIO A LA LISTA DE ENCARGOS
function crearEncargo(nombre, apellidos, tel, urgencia, desc, fotoUrl, extras) {
    const lista = document.getElementById('lista-encargos'); // Ahora apunta al <tbody>

    // Creamos la fila 
    const fila = document.createElement('tr');
    fila.className = 'encargo-fila';

    // Añadimos a las celdas sus respectivos datos
    fila.innerHTML = `
        <td class="td-foto">
            <img src="${fotoUrl}" class="tabla-img-mini">
        </td>
        <td class="td-cliente">
            <strong>${nombre.toUpperCase()} ${apellidos.toUpperCase()}</strong>
        </td>
        <td class="td-tel">${tel}</td>
        <td class="td-urgencia">
            <span class="badge badge-${urgencia}">${urgencia.toUpperCase()}</span>
        </td>
        <td class="td-extras">
            <div class="extras-tag-container">
                ${extras} 
            </div>
        </td>
        <td class="td-desc">
            <div class="desc-truncate">"${desc || 'Sin descripción'}"</div>
        </td>
        <td class="td-acciones">
            <div class="btn-group-tabla">
                <button class="btn btn-complete" title="Finalizar">
                    <span class="material-symbols-outlined">check</span>
                </button>
                <button class="btn btn-clone" title="Duplicar">
                    <span class="material-symbols-outlined">content_copy</span>
                </button>
                <button class="btn btn-delete" title="Eliminar">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </td>
    `;

    // Vinculamos eventos a los botones dentro de la fila
    rebindEventos(fila);

    // Añadimos la fila a la tabla
    lista.appendChild(fila);
}


// BOTONES
function rebindEventos(elemento) {

    //  Botón de eliminar
    elemento.querySelector('.btn-delete').onclick = () => elemento.remove();

    // Botón de clonar
    elemento.querySelector('.btn-clone').onclick = () => {
        const clon = elemento.cloneNode(true);
        rebindEventos(clon);
        elemento.parentNode.appendChild(clon);
    };

    // Botón de finalizar encargo
    elemento.querySelector('.btn-complete').onclick = (e) => {
        elemento.classList.add('fila-completada'); // Añadimos una clase para el CSS
        elemento.style.opacity = "0.5";
        elemento.style.backgroundColor = "#d4edda";
        e.target.disabled = true;
    };
}

// Seleccionamos los elementos del DOM necesarios para el modal
const modal = document.getElementById("modal-visor");
const imgModal = document.getElementById("img-ampliada");
const spanCerrar = document.querySelector(".cerrar-modal");

// Referencia al cuerpo de la tabla para aplicar delegación de eventos
const listaEncargos = document.getElementById('lista-encargos');

// Verificamos que el contenedor de la lista existe para evitar errores en otras páginas
if (listaEncargos) {
    listaEncargos.addEventListener('click', function (e) {
        // Comprobamos si el elemento clickeado tiene la clase de las miniaturas
        if (e.target && e.target.classList.contains('tabla-img-mini')) {
            // Activamos el modal usando 'flex' para que el CSS lo centre automáticamente
            modal.style.display = "flex";
            // Clonamos la ruta (src) de la miniatura a la imagen del modal
            imgModal.src = e.target.src;
        }
    });
}

// Cerrar modal
if (spanCerrar) {
    spanCerrar.onclick = () => {
        modal.style.display = "none";
    };
}

// Cierre por "clic fuera": Si el usuario pulsa en el fondo oscuro (el modal en sí)
// y no en la imagen, el visor se cierra.
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};