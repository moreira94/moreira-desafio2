import express from 'express';
import ProductManager from './productManager.js';

const app = express();

let productManager = new ProductManager();
const products = await productManager.getProducts()

app.get('/', (req, res) => {
    res.send('Bienvenido al administrador de productos')
});

app.get('/products', (req, res) => {
    const { limit } = req.query
    const nuevoArray = products.slice (0, limit)
    res.send(nuevoArray)
})

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params
    const productById = products.find(product => product.id === parseInt(pid))
    if (!productById) return res.send(`El producto con el id ${pid} no existe`);

    res.send(productById)
    console.log(productById);
})

app.listen(8080, err => {
    if(err) console.log(err);
    console.log('Server escuchando en puerto 8080');
})