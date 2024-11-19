const calificaciones = [];

function agregarCalificacion() {
  const nombre = prompt("Ingresa el nombre del estudiante:");
  const apellido = prompt("Ingresa el apellido del estudiante:");
  const nota = prompt("Ingresa la calificación de " + nombre + " " + apellido + " (0-100):");
  const notaNumero = parseFloat(nota);

  if (notaNumero >= 0 && notaNumero <= 100 && !isNaN(notaNumero)) {
    const calificacion = {
      nombre: nombre,
      apellido: apellido,
      nota: notaNumero
    };
    calificaciones.push(calificacion);
    alert("¡Calificación de " + nombre + " " + apellido + " agregada con éxito!");
  } else {
    alert("Por favor, ingresa una calificación válida entre 0 y 100.");
  }
}

function mostrarCalificaciones() {
  if (calificaciones.length === 0) {
    alert("No se han cargado calificaciones aún.");
  } else {
    let listaCalificaciones = "";
    for (let i = 0; i < calificaciones.length; i++) {
      const calificacion = calificaciones[i];
      listaCalificaciones += calificacion.nombre + " " + calificacion.apellido + ": " + calificacion.nota + "\n";
    }
    alert("Las calificaciones registradas son:\n" + listaCalificaciones);
  }
}

function buscarCalificacion() {
  const nombreBuscar = prompt("Ingresa el nombre del estudiante que querés buscar:");
  const apellidoBuscar = prompt("Ingresa el apellido del estudiante:");
  let encontrado = false;

  for (let i = 0; i < calificaciones.length; i++) {
    const calificacion = calificaciones[i];
    if (calificacion.nombre.toLowerCase() === nombreBuscar.toLowerCase() &&
        calificacion.apellido.toLowerCase() === apellidoBuscar.toLowerCase()) {
      alert("La calificación de " + nombreBuscar + " " + apellidoBuscar + " es: " + calificacion.nota);
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    alert("No encontramos a " + nombreBuscar + " " + apellidoBuscar + ".");
  }
}

function filtrarCalificacionesAltas() {
  const maximo = prompt("Ingresa el valor maximo para filtrar las calificaciones altas (0-100):");
  const maximoNumero = parseFloat(maximo);

  if (!isNaN(maximoNumero) && maximoNumero >= 0 && maximoNumero <= 100) {
    let calificacionesAltas = "";
    for (let i = 0; i < calificaciones.length; i++) {
      const calificacion = calificaciones[i];
      if (calificacion.nota > maximoNumero) {
        calificacionesAltas += calificacion.nombre + " " + calificacion.apellido + ": " + calificacion.nota + "\n";
      }
    }

    if (calificacionesAltas !== "") {
      alert("Las calificaciones mayores a " + maximoNumero + " son:\n" + calificacionesAltas);
    } else {
      alert("No hay calificaciones mayores a " + maximoNumero + ".");
    }
  } else {
    alert("Por favor, ingresa un numero válido entre 0 y 100.");
  }
}

function ejecutarPrograma() {
  alert("¡Bienvenido al simulador de calificaciones!");
  let continuar = true;
  while (continuar) {
    const opcion = prompt("¿Qué querés hacer?\n1. Agregar calificación\n2. Mostrar calificaciones\n3. Buscar calificación por nombre\n4. Filtrar calificaciones altas\n5. Salir");

    if (opcion === "1") {
      agregarCalificacion();
    } else if (opcion === "2") {
      mostrarCalificaciones();
    } else if (opcion === "3") {
      buscarCalificacion();
    } else if (opcion === "4") {
      filtrarCalificacionesAltas();
    } else if (opcion === "5") {
      continuar = false;
    }
  }
}

ejecutarPrograma();
