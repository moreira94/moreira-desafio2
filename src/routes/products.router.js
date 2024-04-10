import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = new Router();
let productManager = new ProductManager();
let products = await productManager.getProducts()
let productStatus = true

router.get('/', async (req, res) => {
    const { limit } = req.query
    if(!limit) {
        let arrayDeProductos = await productManager.getProducts()
        return res.send(arrayDeProductos)
    }
    const nuevoArray = await products.slice (0, limit)
    res.send(nuevoArray)
})

router.post('/', async (req, res) => {
    let products = await productManager.getProducts()
    const {title, description, code, price, stock, category, thumbnails} = req.body;

    let iDGenerator = products.at(-1).id+1;

    const newProduct= {
        id: iDGenerator,
        title,
        description,
        code,
        price,
        status: productStatus,
        stock,
        category,
        thumbnails
    }

    if (!title || !description || !price || !thumbnails || !code || !stock || !category ) return res.send({status: 'error', error: 'falta completar algunos campos'})
    if (products.some(product => product.code === code)) {
        return res.send({status: 'error', error: 'Ya existe un producto con ese código'})};

    let arrayNuevo = [...products, newProduct];
    // let products = arrayNuevo
    productManager.jsonSave(arrayNuevo);
    res.send({status: 'success', payload: arrayNuevo})
})

router.get('/:pid', async (req, res) => {
    let products = await productManager.getProducts();
    const { pid } = req.params
    const productById = products.find(product => product.id === parseInt(pid))
    if (!productById) return res.send(`El producto con el id ${pid} no existe`);

    res.send(productById)
    console.log(productById);
})

router.put('/:pid', async (req, res) => {
    let products = await productManager.getProducts();
    const { pid } = req.params;
    const {title, description, price, thumbnails, code, stock, category} = req.body;
    const productToUpdate = {
        id: parseInt(pid),
        title,
        description,
        price,
        thumbnails,
        code,
        status:productStatus,
        stock,
        category
    };
    let productFound = products.findIndex(product => product.id === parseInt(pid));
    if (productFound === -1) return res.status(404).send({status: 'error', error: 'product not found'})
    if (!title || !description || !price || !thumbnails || !code || !stock || !category ) return res.send({status: 'error', error: 'falta completar algunos campos'})
    products[productFound] = {id: parseInt(pid), ...productToUpdate};
    
    productManager.jsonSave(products);
    res.send({status: 'success', payload: productToUpdate})
})

router.delete('/api/products/:pid', async (req, res) => {
    let products = await productManager.getProducts();
    const { pid } = req.params;
    const productsResult = products.filter(product => product.id != parseInt(pid));

    productManager.jsonSave(productsResult);
    res.send({status: 'success', payload: productsResult})
})

export default router;