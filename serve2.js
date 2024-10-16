const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // Cambia esto según tu configuración
  password: '1234',
  database: 'dbnode'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas CRUD

// Obtener todos los usuarios
app.get('/api/producto', (req, res) => {
  const sql = 'SELECT * FROM producto';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// Crear un nuevo usuario
app.post('/api/producto', (req, res) => {
    const { nombre, marca,estado } = req.body;
    const sql = 'INSERT INTO producto (nombre, marca,estado) VALUES (?, ?,?)';
    db.query(sql, [nombre, marca,estado], (err, result) => {
      if (err) throw err;
      res.send({ id: result.insertId, nombre, marca,estado });
    });
  });
  
  // Actualizar un usuario
  app.put('/api/producto/:id', (req, res) => {
    const { nombre, marca,estado } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE producto SET nombre = ?, marca = ? , estado = ? WHERE idproducto = ?';
    db.query(sql, [nombre, marca,estado, id], (err, result) => {
      if (err) throw err;
      res.send({ id,nombre, marca,estado});
    });
  });
  
  // Eliminar un usuario
  app.delete('/api/producto/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM producto WHERE idproducto = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send({ message: 'Producto eliminado', id });
    });
  });
  
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});