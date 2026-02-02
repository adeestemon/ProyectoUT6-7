// SERVICIOS DINÁMICOS

const servicios = [
    { titulo: "Eliminación de Personas", desc: "Matamos a sus seres queridos.", img: "img/zombie.png" },
    { titulo: "Eliminación de Mascotas", desc: "Peluditos pero peligrosos.", img: "img/aymigatitozombie.png" },
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

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const tel = document.getElementById('telefono').value;
        const urgencia = document.querySelector('input[name="urgencia"]:checked').value;
        const descripcion = document.getElementById('descripcion').value;

        const fileInput = document.getElementById('foto');
        const archivo = fileInput.files[0];

        if (archivo) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                crearTarjetaEncargo(nombre, apellidos, tel, urgencia, descripcion, ev.target.result);
            };
            reader.readAsDataURL(archivo);
        } else {
            crearTarjetaEncargo(nombre, apellidos, tel, urgencia, descripcion, 'img/zombie.png');
        }

        form.reset();
    });

}

// CREAR TARJETA

function crearTarjetaEncargo(nombre, apellidos, tel, urgencia, desc, fotoUrl) {

    const lista = document.getElementById('lista-encargos');

    const tarjeta = document.createElement('div');
    tarjeta.className = 'encargo-card';

    tarjeta.innerHTML = `
        <div class="card-header">
            <div class="header-top">
                <h3>${nombre.toUpperCase()} ${apellidos.toUpperCase()}</h3>
                <span class="badge badge-${urgencia}">${urgencia.toUpperCase()}</span>
            </div>
            <span class="phone-number">📞 ${tel}</span>
        </div>

        <div class="card-body">
            <img src="${fotoUrl}" class="servicios-img">

            <div class="desc-box">
                "${desc || 'Sin descripción'}"
            </div>

            <div class="status-row">
                Estado:
                <span class="estado-texto">PENDIENTE</span>
            </div>
        </div>

        <div class="card-footer">
            <button class="btn btn-complete">Finalizar</button>
            <button class="btn btn-clone">Duplicar</button>
            <button class="btn btn-delete">Eliminar</button>
        </div>
    `;

    rebindEventos(tarjeta);

    lista.appendChild(tarjeta);
}

// BOTONES

function rebindEventos(elemento) {

    elemento.querySelector('.btn-delete').onclick = () => elemento.remove();

    elemento.querySelector('.btn-clone').onclick = () => {
        const clon = elemento.cloneNode(true);
        rebindEventos(clon);
        elemento.parentNode.appendChild(clon);
    };

    elemento.querySelector('.btn-complete').onclick = () => {
        elemento.style.opacity = "0.6";
        elemento.style.filter = "grayscale(1)";
        elemento.querySelector('.estado-texto').textContent = "COMPLETADO";
        elemento.querySelector('.estado-texto').style.color = "#28a745";
    };
}
