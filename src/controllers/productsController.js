const pool = require ('../db/db');
const dotenv = require('dotenv').config();

const getAllProducts = async (req, res) => {
    const sql = 'SELECT * FROM product';

    try{
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release();
        res.json(rows);

    }catch(err){
        console.log("error getting products");
        res.send(500).send(err);
    }

}


const getProductById = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM product WHERE id_product = ?';

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql, [id]);
        connection.release();
        res.json(result);
    } catch (err) {
        console.log("Error getting product by ID:", err);
        res.status(500).send(err);
    }
}

// const createProduct = (req, res) => {
//     console.log("Creating Product...");
//     const { img, name, price, stock, category } = req.body;

//     const sql = 'INSERT INTO product (img, name, price, stock, id_category) VALUES (?,?,?, ?, ?)';
//     db.query(sql, [img, name, price, stock, category], (err, result) => {
//         if (err) throw err;
//         res.json(
//             {
//                 message: 'Product created',
//                 productId: result.insertId
//             });
//     })
// }

const createProduct = async (req, res) => {
    console.log("Creating Product...");
    const { img, name, price, stock, category } = req.body;
    const sql = 'INSERT INTO product (img, name, price, stock, id_category) VALUES (?,?,?,?,?)';

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql, [img, name, price, stock, category]);
        connection.release();
        res.json({
            message: 'Product created',
            productId: result.insertId
        });
    } catch (err) {
        console.log("Error creating product:", err);
        res.status(500).send(err);
    }
}

const updateProduct = async (req, res) => {
    console.log("Updating Product...");
    const { id } = req.params;
    const { img, name, price, stock, id_category } = req.body;
    const sql = 'UPDATE product SET img = ?, name = ?, price = ?, stock = ?, id_category = ? WHERE id_product = ?';

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql, [img, name, price, stock, id_category, id]);
        connection.release();
        res.json({
            message: 'Product updated'
        });
    } catch (err) {
        console.log("Error updating product:", err);
        res.status(500).send(err);
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM product WHERE id_product = ?';

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql, [id]);
        connection.release();
        res.json({
            message: 'Product deleted'
        });
    } catch (err) {
        console.log("Error deleting product:", err);
        res.status(500).send(err);
    }
}



// Exporta la función
module.exports = {
    getAllProducts,
    // Agrega las demás funciones aquí si las tienes definidas
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};