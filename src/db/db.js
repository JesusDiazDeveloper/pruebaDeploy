const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const initDB = async () => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
        });

        // Crear la base de datos si no existe
        await connection.query('CREATE DATABASE IF NOT EXISTS atlas_gym');
        console.log('Database ensured');

        // Cambiar el usuario a la base de datos
        await connection.changeUser({ database: 'atlas_gym' });

        // Leer el archivo SQL y ejecutar las consultas
        const sqlFilePath = path.join(__dirname, 'AtlasGym.sql');
        const queriesForCreateTables = fs.readFileSync(sqlFilePath, 'utf8').split(';');

        for (let query of queriesForCreateTables) {
            if (query.trim()) {
                await connection.query(query);
            }
        }

        console.log('Tables Created');
    } catch (err) {
        console.error('Error initializing database: ' + err.stack);
    } 
    // finally {
    //     if (connection) {
    //         await connection.end();
    //     }
    // }
};

const createPool = () => {
    return mysql.createPool({
        host: process.env.MYSQL_ADDON_HOST,
        user: process.env.MYSQL_ADDON_USER,
        password: process.env.MYSQL_ADDON_PASSWORD,
        database: process.env.MYSQL_ADDON_DB,
        connectionLimit: 10,
    });
};

let pool;

const startApp = async () => {
    try {
        // await initDB();
        pool = await createPool();
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        conn.release();
        console.log("Connection released");
    } catch (err) {
        console.error('Error connecting to the database: ' + err.stack);
    }

    // Exportar pool para su uso en otras partes de la aplicación
    module.exports.pool = pool;
};


// Inicia la aplicación y exporta un objeto vacío inicialmente
startApp();

const getPool = async () => {
    if (!pool) {
        pool = createPool();
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        conn.release();
        console.log("Connection released");
    }
    console.log("Estoy Aca");
    return pool;
};


module.exports = { initDB, startApp , pool , getPool }; // Exportar solo las funciones