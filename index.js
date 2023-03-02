const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');


// Servidor de express
const app = express();

// Base de datos
dbConnection();

// Cors
app.use(cors())

// Directorio publico
app.use(express.static('public'));

// Parseo de json
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/book'));

// Servidor escuchando
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});