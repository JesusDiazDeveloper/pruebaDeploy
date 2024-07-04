const express = require('express');

const productsRoutes = require('./src/routes/productsRoutes');

require('./src/db/db.js'); // Importar el archivo de inicialización de la base de datos

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    const htmlResponse =`
        <html>
            <head>
                <title>Atlas Gym</title>
            </head>
            <body>
                <h1>Bienvenido a la API de Atlas Gym</h1>
            </body> 
        </html>`
        ;
    res.send(htmlResponse);
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));