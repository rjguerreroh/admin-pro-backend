require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

/* Crear el servidor de express  */
const app = express();

// Configurar cors
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ` + process.env.PORT);
});


/** Rutas */
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/searches', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));

app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});