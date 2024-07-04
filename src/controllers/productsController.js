const db = require('../db/db');
const {getPool} = require('../db/db')

const getAllProducts = async (req, res) => {
    const sql = 'SELECT * FROM product';
    try {
        // Esperar hasta que el pool esté disponible
        // const pool = await waitForPool();
        // const pool = ;
        // if (!pool) {
        //     throw new Error('Database connection pool is not available');
        // }
        
        const pool = await getPool();
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql);
        res.send(result);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting products');
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM product WHERE id_product = ?';

    try {
        const [result] = await pool.query(sql, [id]);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting product');
    }
}

const createProduct = async (req, res) => {
    const { img, name, price, stock, category } = req.body;
    const sql = 'INSERT INTO product (img, name, price, stock, id_category) VALUES (?, ?, ?, ?, ?)';

    try {
        const [result] = await pool.query(sql, [img, name, price, stock, category]);
        res.json({
            message: 'Product created',
            productId: result.insertId
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating product');
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { img, name, price, stock, id_category } = req.body;
    const sql = 'UPDATE product SET img = ?, name = ?, price = ?, stock = ?, id_category = ? WHERE id_product = ?';

    try {
        await pool.query(sql, [img, name, price, stock, id_category, id]);
        res.json({ message: 'Product updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating product');
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM product WHERE id_product = ?';

    try {
        await pool.query(sql, [id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting product');
    }
}

// Función para esperar a que el pool esté disponible
const waitForPool = async () => {
    while (!db.pool) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Espera 100ms
    }
    return db.pool;
}

module.exports = { getAllProducts };



module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};