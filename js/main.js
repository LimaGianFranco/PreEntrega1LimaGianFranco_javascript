
function mostrarCalificaciones() {
  fetch('http://localhost:3000/calificaciones')
    .then(response => response.json())
    .then(data => {
      const resultados = document.getElementById('resultados');
      resultados.innerHTML = '<h3>Calificaciones:</h3>';

      if (data.length === 0) {
        resultados.innerHTML += '<p>No hay calificaciones registradas.</p>';
      } else {
        const lista = document.createElement('ul');
        data.forEach(c => {
          const item = document.createElement('li');
          item.textContent = `${c.nombre} ${c.apellido}: ${c.nota}`;
          lista.appendChild(item);
        });
        resultados.appendChild(lista);
      }
    })
    .catch(error => console.error('Error al obtener calificaciones:', error));
}

function agregarCalificacion(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const nota = parseFloat(document.getElementById('nota').value);

  if (!isNaN(nota) && nota >= 1 && nota <= 100) {
    const nuevaCalificacion = { nombre, apellido, nota };

    fetch('http://localhost:3000/calificaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCalificacion),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        mostrarCalificaciones();
        
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('nota').value = '';
      })
      .catch(error => console.error('Error al agregar calificación:', error));
  } else {
    alert('Por favor ingresa una calificación válida entre 1 y 100.');
  }
}

function borrarDatos() {
  fetch('http://localhost:3000/calificaciones', {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      mostrarCalificaciones();
    })
    .catch(error => console.error('Error al borrar calificaciones:', error));
}


function filtrarCalificacionesAltas() {
  fetch('http://localhost:3000/calificaciones')
    .then(response => response.json())
    .then(data => {
      const resultados = document.getElementById('resultados');
      resultados.innerHTML = '<h3>Calificaciones Altas (≥ 70):</h3>';

      const altas = data.filter(c => c.nota >= 70);
      
      if (altas.length === 0) {
        resultados.innerHTML += '<p>No hay calificaciones altas registradas.</p>';
      } else {
        const lista = document.createElement('ul');
        altas.forEach(c => {
          const item = document.createElement('li');
          item.textContent = `${c.nombre} ${c.apellido}: ${c.nota}`;
          lista.appendChild(item);
        });
        resultados.appendChild(lista);
      }
    })
    .catch(error => console.error('Error al filtrar calificaciones altas:', error));
}

function buscarCalificacion() {
  const nombreBuscado = prompt('Ingrese el nombre a buscar:');
  if (!nombreBuscado) return;

  fetch('http://localhost:3000/calificaciones')
    .then(response => response.json())
    .then(data => {
      const resultados = document.getElementById('resultados');
      const encontrado = data.filter(c => c.nombre.toLowerCase() === nombreBuscado.toLowerCase());

      if (encontrado.length === 0) {
        resultados.innerHTML = `<p>No se encontró ninguna calificación para "${nombreBuscado}".</p>`;
      } else {
        resultados.innerHTML = `<h3>Resultados para "${nombreBuscado}":</h3>`;
        const lista = document.createElement('ul');
        encontrado.forEach(c => {
          const item = document.createElement('li');
          item.textContent = `${c.nombre} ${c.apellido}: ${c.nota}`;
          lista.appendChild(item);
        });
        resultados.appendChild(lista);
      }
    })
    .catch(error => console.error('Error al buscar calificaciones:', error));
}

document.getElementById('formAgregar').addEventListener('submit', agregarCalificacion);
document.getElementById('btnMostrar').addEventListener('click', mostrarCalificaciones);
document.getElementById('btnBorrar').addEventListener('click', borrarDatos);
document.getElementById('btnFiltrar').addEventListener('click', filtrarCalificacionesAltas);
document.getElementById('btnBuscar').addEventListener('click', buscarCalificacion);

mostrarCalificaciones();
