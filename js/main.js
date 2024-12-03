const calificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [];

function actualizarStorage() {
  localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
}

function agregarCalificacion(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const nota = parseFloat(document.getElementById("nota").value);

  if (!isNaN(nota) && nota >= 0 && nota <= 100) {
    calificaciones.push({ nombre, apellido, nota });
    actualizarStorage();
    mostrarMensaje(`Calificación de ${nombre} ${apellido} agregada con éxito.`, "success");
    e.target.reset();
  } else {
    mostrarMensaje("Por favor ingresa una calificación válida entre 0 y 100.", "error");
  }
}

function mostrarCalificaciones() {
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "<h3>Calificaciones:</h3>";
  if (calificaciones.length === 0) {
    resultados.innerHTML += "<p>No hay calificaciones registradas.</p>";
  } else {
    const lista = calificaciones
      .map(c => `<p>${c.nombre} ${c.apellido}: ${c.nota}</p>`)
      .join("");
    resultados.innerHTML += lista;
  }
}

function buscarCalificacion() {
  const nombreBuscar = prompt("Ingresa el nombre:");
  const apellidoBuscar = prompt("Ingresa el apellido:");
  const encontrado = calificaciones.find(
    c => c.nombre.toLowerCase() === nombreBuscar.toLowerCase() &&
         c.apellido.toLowerCase() === apellidoBuscar.toLowerCase()
  );

  const resultados = document.getElementById("resultados");
  if (encontrado) {
    resultados.innerHTML = `<p>La calificación de ${encontrado.nombre} ${encontrado.apellido} es ${encontrado.nota}.</p>`;
  } else {
    resultados.innerHTML = "<p>No se encontró al estudiante.</p>";
  }
}

function filtrarCalificacionesAltas() {
  const maximo = parseFloat(prompt("Ingresa el valor máximo para filtrar:"));
  const resultados = document.getElementById("resultados");

  if (!isNaN(maximo) && maximo >= 0 && maximo <= 100) {
    const altas = calificaciones.filter(c => c.nota > maximo);
    if (altas.length > 0) {
      resultados.innerHTML = altas
        .map(c => `<p>${c.nombre} ${c.apellido}: ${c.nota}</p>`)
        .join("");
    } else {
      resultados.innerHTML = "<p>No hay calificaciones mayores al valor dado.</p>";
    }
  } else {
    mostrarMensaje("Por favor ingresa un número válido entre 0 y 100.", "error");
  }
}

function borrarDatos() {
  localStorage.clear();
  calificaciones.length = 0;
  mostrarMensaje("Se han borrado todas las calificaciones.", "success");
}

function mostrarMensaje(mensaje, tipo) {
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = `<p class="${tipo}">${mensaje}</p>`;
}

document.getElementById("formAgregar").addEventListener("submit", agregarCalificacion);
document.getElementById("btnMostrar").addEventListener("click", mostrarCalificaciones);
document.getElementById("btnFiltrar").addEventListener("click", filtrarCalificacionesAltas);
document.getElementById("btnBuscar").addEventListener("click", buscarCalificacion);
document.getElementById("btnBorrar").addEventListener("click", borrarDatos);
