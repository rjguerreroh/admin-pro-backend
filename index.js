require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')

/* Crear el servidor de express  */

const app = express();

// Configurar cors
app.use(cors());
dbConnection();

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ` + process.env.PORT);
});


/** Rutas */

app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});


/**
 * pass: qDzyAdKjoBjvij6b
 * mean-user
 * mongodb+srv://username:password@cluster0-jtpxd.mongodb.net/admin
 */