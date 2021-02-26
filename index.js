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
app.use('/api/login', require('./routes/auth'));

app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});