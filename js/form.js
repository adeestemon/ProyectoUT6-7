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

                    // Creamos los datos de la lista
                    crearEncargo(nombre, apellidos, tel, urgencia, descripcion, datos.url);

                    // Limpiamos el formulario AHORA que ya sabemos que se guardó
                    form.reset();
                } else {
                    alert("Error al subir el encargo");
                }
            })
            .catch(error => console.error('Error:', error));
    });
}

// AÑADE EL ENCARGO DEL FORMULARIO A LA LISTA DE ENCARGOS
function crearEncargo(nombre, apellidos, tel, urgencia, desc, fotoUrl) {
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
        <td class="td-desc">
            <div class="desc-truncate">"${desc || 'Sin descripción'}"</div>
        </td>
        <td class="td-acciones">
            <div class="btn-group-tabla">
                <button class="btn btn-complete" title="Finalizar">✅</button>
                <button class="btn btn-clone" title="Duplicar">👯</button>
                <button class="btn btn-delete" title="Eliminar">🗑️</button>
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