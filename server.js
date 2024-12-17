const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const archivo = './calificaciones.json';

app.get('/calificaciones', (req, res) => {
  fs.readFile(archivo, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error al leer las calificaciones.' });
    } else {
      res.json(JSON.parse(data || '[]'));
    }
  });
});

app.post('/calificaciones', (req, res) => {
  const nuevaCalificacion = req.body;

  fs.readFile(archivo, (err, data) => {
    const calificaciones = JSON.parse(data || '[]');
    calificaciones.push(nuevaCalificacion);

    fs.writeFile(archivo, JSON.stringify(calificaciones, null, 2), err => {
      if (err) {
        res.status(500).json({ message: 'Error al guardar la calificación.' });
      } else {
        res.json({ message: 'Calificación agregada con éxito.' });
      }
    });
  });
});

app.delete('/calificaciones', (req, res) => {
  fs.writeFile(archivo, JSON.stringify([], null, 2), err => {
    if (err) {
      res.status(500).json({ message: 'Error al borrar las calificaciones.' });
    } else {
      res.json({ message: 'Todas las calificaciones fueron eliminadas.' });
    }
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
